"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTE_ORDER = ["/", "/about", "/projects", "/experience", "/thoughts"] as const;
const NAVIGATION_TIMEOUT_MS = 1800;
const PANEL_TRANSITION_MS = 440;

type RouteTransitionPhase = "idle" | "animating";
type RouteTransitionDirection = 1 | -1;

interface RouteTransitionStageController {
  captureSnapshot: (direction: RouteTransitionDirection) => boolean;
  clearSnapshot: () => void;
  startAnimation: () => boolean;
}

interface RouteTransitionContextValue {
  activePathname: string;
  direction: RouteTransitionDirection;
  isRouteTransitioning: boolean;
  navigateWithTransition: (href: string) => void;
  pendingPathname: string | null;
  phase: RouteTransitionPhase;
  prefetchRoute: (href: string) => void;
  completeRouteTransition: () => void;
}

interface RouteTransitionNavigationContextValue {
  activePathname: string;
  navigateWithTransition: (href: string) => void;
  prefetchRoute: (href: string) => void;
  registerNavigationSnapshotPreparation: (prepare: (() => void) | null) => void;
  registerRouteTransitionStageController: (
    controller: RouteTransitionStageController | null
  ) => void;
}

const RouteTransitionStateContext = createContext<RouteTransitionContextValue | null>(
  null
);

const RouteTransitionNavigationContext =
  createContext<RouteTransitionNavigationContextValue | null>(
    null
  );

function useRouteTransitionStateContext() {
  const context = useContext(RouteTransitionStateContext);

  if (!context) {
    throw new Error(
      "Route transition hooks must be used inside RouteTransitionProvider."
    );
  }

  return context;
}

function useRouteTransitionNavigationContext() {
  const context = useContext(RouteTransitionNavigationContext);

  if (!context) {
    throw new Error(
      "Route transition hooks must be used inside RouteTransitionProvider."
    );
  }

  return context;
}

function normalizePathname(pathname: string | null | undefined) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getRouteIndex(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  const index = ROUTE_ORDER.indexOf(
    normalizedPathname as (typeof ROUTE_ORDER)[number]
  );

  return index === -1 ? ROUTE_ORDER.length : index;
}

function getTransitionDirection(fromPathname: string, toPathname: string) {
  return getRouteIndex(toPathname) > getRouteIndex(fromPathname) ? 1 : -1;
}

function syncScrollableOffsets(sourceRoot: HTMLElement, clonedRoot: HTMLElement) {
  clonedRoot.scrollTop = sourceRoot.scrollTop;
  clonedRoot.scrollLeft = sourceRoot.scrollLeft;

  const sourceElements = sourceRoot.querySelectorAll<HTMLElement>("*");
  const clonedElements = clonedRoot.querySelectorAll<HTMLElement>("*");

  sourceElements.forEach((sourceElement, index) => {
    const clonedElement = clonedElements[index];

    if (!clonedElement) {
      return;
    }

    if (sourceElement.scrollTop !== 0) {
      clonedElement.scrollTop = sourceElement.scrollTop;
    }

    if (sourceElement.scrollLeft !== 0) {
      clonedElement.scrollLeft = sourceElement.scrollLeft;
    }
  });
}

export function RouteTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = normalizePathname(usePathname());
  const [phase, setPhase] = useState<RouteTransitionPhase>("idle");
  const [direction, setDirection] = useState<RouteTransitionDirection>(1);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const navigationResolverRef = useRef<((didNavigate: boolean) => void) | null>(null);
  const navigationTimeoutRef = useRef<number | null>(null);
  const navigationPreparationRef = useRef<(() => void) | null>(null);
  const routeTransitionStageControllerRef =
    useRef<RouteTransitionStageController | null>(null);
  const pathnameRef = useRef(pathname);
  const phaseRef = useRef<RouteTransitionPhase>(phase);
  const animationStartFrameRef = useRef<number | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
    phaseRef.current = phase;
  }, [pathname, phase]);

  const clearNavigationWait = useCallback(() => {
    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    navigationResolverRef.current = null;
  }, []);

  const registerNavigationSnapshotPreparation = useCallback(
    (prepare: (() => void) | null) => {
      navigationPreparationRef.current = prepare;
    },
    []
  );

  const registerRouteTransitionStageController = useCallback(
    (controller: RouteTransitionStageController | null) => {
      routeTransitionStageControllerRef.current = controller;
    },
    []
  );

  const cleanupTransitionMarkers = useCallback(() => {
    const root = document.documentElement;
    delete root.dataset.routeTransition;
    delete root.dataset.routeTransitionActive;
  }, []);

  const clearAnimationStartFrame = useCallback(() => {
    if (animationStartFrameRef.current !== null) {
      window.cancelAnimationFrame(animationStartFrameRef.current);
      animationStartFrameRef.current = null;
    }
  }, []);

  const finalizeTransition = useCallback(() => {
    clearAnimationStartFrame();
    clearNavigationWait();
    cleanupTransitionMarkers();
    routeTransitionStageControllerRef.current?.clearSnapshot();
    setPendingPath(null);
    setPhase("idle");
  }, [clearAnimationStartFrame, clearNavigationWait, cleanupTransitionMarkers]);

  const prefetchRoute = useCallback(
    (href: string) => {
      const targetPath = normalizePathname(href);

      if (!targetPath || targetPath === pathnameRef.current) {
        return;
      }

      router.prefetch(targetPath);
    },
    [router]
  );

  useEffect(() => {
    ROUTE_ORDER.forEach((route) => {
      if (route !== pathname) {
        router.prefetch(route);
      }
    });
  }, [pathname, router]);

  useEffect(() => {
    if (!pendingPath || pathname !== pendingPath || !navigationResolverRef.current) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    animationStartFrameRef.current = window.requestAnimationFrame(() => {
      animationStartFrameRef.current = null;

      const didStartAnimation =
        routeTransitionStageControllerRef.current?.startAnimation() ?? false;

      if (!didStartAnimation) {
        finalizeTransition();
      }

      navigationResolverRef.current?.(true);
      clearNavigationWait();
    });
  }, [clearAnimationStartFrame, clearNavigationWait, finalizeTransition, pathname, pendingPath]);

  useEffect(
    () => () => {
      clearAnimationStartFrame();
      clearNavigationWait();
      cleanupTransitionMarkers();
    },
    [clearAnimationStartFrame, clearNavigationWait, cleanupTransitionMarkers]
  );

  const navigateWithTransition = useCallback(
    (href: string) => {
      const targetPath = normalizePathname(href);

      const currentPathname = pathnameRef.current;
      const currentPhase = phaseRef.current;

      if (!targetPath || targetPath === currentPathname || currentPhase !== "idle") {
        return;
      }

      prefetchRoute(targetPath);

      const nextDirection = getTransitionDirection(currentPathname, targetPath);
      const root = document.documentElement;

      navigationPreparationRef.current?.();
      routeTransitionStageControllerRef.current?.captureSnapshot(nextDirection);
      setDirection(nextDirection);
      setPendingPath(targetPath);
      setPhase("animating");

      root.dataset.routeTransition = nextDirection === 1 ? "forward" : "backward";
      root.dataset.routeTransitionActive = "true";

      const waitForNavigation = () =>
        new Promise<boolean>((resolve) => {
          navigationResolverRef.current = resolve;
          navigationTimeoutRef.current = window.setTimeout(() => {
            resolve(false);
            clearNavigationWait();
          }, NAVIGATION_TIMEOUT_MS);

          startTransition(() => {
            router.push(targetPath, { scroll: false });
          });
        });

      void waitForNavigation()
        .then((didNavigate) => {
          if (!didNavigate) {
            finalizeTransition();
          }
        })
        .catch(() => {
          finalizeTransition();
        });
    },
    [clearNavigationWait, finalizeTransition, prefetchRoute, router]
  );

  const activePathname = pendingPath ?? pathname;

  const navigationValue = useMemo(
    () => ({
      activePathname,
      navigateWithTransition,
      prefetchRoute,
      registerNavigationSnapshotPreparation,
      registerRouteTransitionStageController,
    }),
    [
      activePathname,
      navigateWithTransition,
      prefetchRoute,
      registerNavigationSnapshotPreparation,
      registerRouteTransitionStageController,
    ]
  );

  const stateValue = useMemo(
    () => ({
      activePathname,
      completeRouteTransition: finalizeTransition,
      direction,
      isRouteTransitioning: phase !== "idle",
      navigateWithTransition,
      pendingPathname: pendingPath,
      phase,
      prefetchRoute,
    }),
    [
      activePathname,
      direction,
      finalizeTransition,
      navigateWithTransition,
      pendingPath,
      phase,
      prefetchRoute,
    ]
  );

  return (
    <RouteTransitionStateContext.Provider value={stateValue}>
      <RouteTransitionNavigationContext.Provider value={navigationValue}>
        {children}
      </RouteTransitionNavigationContext.Provider>
    </RouteTransitionStateContext.Provider>
  );
}

export function useRouteTransitionNavigation() {
  const {
    activePathname,
    navigateWithTransition,
    prefetchRoute,
    registerNavigationSnapshotPreparation,
  } =
    useRouteTransitionNavigationContext();

  return {
    activePathname,
    navigateWithTransition,
    prefetchRoute,
    registerNavigationSnapshotPreparation,
  };
}

export function useRouteTransitionState() {
  const {
    activePathname,
    completeRouteTransition,
    direction,
    isRouteTransitioning,
    pendingPathname,
    phase,
  } =
    useRouteTransitionStateContext();

  return {
    activePathname,
    completeRouteTransition,
    direction,
    isRouteTransitioning,
    pendingPathname,
    phase,
  };
}

export function RouteTransitionShell({ children }: { children: ReactNode }) {
  const {
    completeRouteTransition,
    direction,
    phase,
  } = useRouteTransitionStateContext();
  const { registerRouteTransitionStageController } =
    useRouteTransitionNavigationContext();
  const liveContentRef = useRef<HTMLDivElement | null>(null);
  const snapshotHostRef = useRef<HTMLDivElement | null>(null);
  const animationTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const snapshotRunIdRef = useRef(0);
  const activeSnapshotRunIdRef = useRef<number | null>(null);
  const snapshotDirectionRef = useRef<RouteTransitionDirection | null>(null);
  const [snapshotDirection, setSnapshotDirection] =
    useState<RouteTransitionDirection | null>(null);
  const [isSnapshotAnimating, setIsSnapshotAnimating] = useState(false);
  const [isIncomingAnimating, setIsIncomingAnimating] = useState(false);

  const clearSnapshot = useCallback(() => {
    if (animationTimerRef.current !== null) {
      window.clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const snapshotHost = snapshotHostRef.current;

    if (snapshotHost) {
      snapshotHost.replaceChildren();
      snapshotHost.setAttribute("hidden", "true");
      snapshotHost.removeAttribute("inert");
    }

    activeSnapshotRunIdRef.current = null;
    snapshotDirectionRef.current = null;
    setSnapshotDirection(null);
    setIsSnapshotAnimating(false);
    setIsIncomingAnimating(false);
  }, []);

  const captureSnapshot = useCallback(
    (nextDirection: RouteTransitionDirection) => {
      const liveContent = liveContentRef.current;
      const snapshotHost = snapshotHostRef.current;

      if (!liveContent || !snapshotHost) {
        clearSnapshot();
        return false;
      }

      const rect = liveContent.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        clearSnapshot();
        return false;
      }

      const clone = liveContent.cloneNode(true) as HTMLDivElement;
      const runId = snapshotRunIdRef.current + 1;
      snapshotRunIdRef.current = runId;
      activeSnapshotRunIdRef.current = runId;
      snapshotDirectionRef.current = nextDirection;

      clone.style.position = "absolute";
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = "0";
      clone.classList.add("route-transition-snapshot-clone");
      clone.classList.remove(
        "route-transition-panel--enter-forward",
        "route-transition-panel--enter-backward"
      );
      clone.setAttribute("aria-hidden", "true");

      clone.querySelectorAll("[id]").forEach((element) => {
        element.removeAttribute("id");
      });

      syncScrollableOffsets(liveContent, clone);

      snapshotHost.replaceChildren(clone);
      snapshotHost.removeAttribute("hidden");
      snapshotHost.setAttribute("inert", "");

      setIsSnapshotAnimating(false);
      setIsIncomingAnimating(false);
      setSnapshotDirection(nextDirection);

      return true;
    },
    [clearSnapshot]
  );

  const startAnimation = useCallback(() => {
    const currentDirection = snapshotDirectionRef.current;
    const runId = activeSnapshotRunIdRef.current;

    if (!currentDirection || runId === null) {
      return false;
    }

    if (animationTimerRef.current !== null) {
      window.clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = null;

        if (activeSnapshotRunIdRef.current !== runId) {
          return;
        }

        setIsSnapshotAnimating(true);
        setIsIncomingAnimating(true);

        animationTimerRef.current = window.setTimeout(() => {
          if (activeSnapshotRunIdRef.current !== runId) {
            return;
          }

          completeRouteTransition();
        }, PANEL_TRANSITION_MS);
      });
    });

    return true;
  }, [completeRouteTransition]);

  useEffect(
    () => () => {
      clearSnapshot();
    },
    [clearSnapshot]
  );

  useEffect(() => {
    registerRouteTransitionStageController({
      captureSnapshot,
      clearSnapshot,
      startAnimation,
    });

    return () => {
      registerRouteTransitionStageController(null);
    };
  }, [
    captureSnapshot,
    clearSnapshot,
    registerRouteTransitionStageController,
    startAnimation,
  ]);

  const liveContentClassName = [
    "route-transition-panel",
    isIncomingAnimating
      ? direction === 1
        ? "route-transition-panel--enter-forward"
        : "route-transition-panel--enter-backward"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const snapshotHostClassName = [
    "route-transition-snapshot-host",
    isSnapshotAnimating && snapshotDirection
      ? snapshotDirection === 1
        ? "route-transition-snapshot-host--exit-forward"
        : "route-transition-snapshot-host--exit-backward"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="route-transition-stage relative isolate min-h-screen overflow-x-clip"
      data-route-transition-phase={phase}
    >
      <div
        ref={snapshotHostRef}
        aria-hidden="true"
        className={snapshotHostClassName}
        hidden
      />
      <div ref={liveContentRef} className={liveContentClassName}>
        {children}
      </div>
    </div>
  );
}
