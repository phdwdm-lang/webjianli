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
import { flushSync } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

const ROUTE_ORDER = ["/", "/about", "/projects", "/experience", "/thoughts"] as const;
const NAVIGATION_TIMEOUT_MS = 1800;

type RouteTransitionPhase = "idle" | "animating";
type RouteTransitionDirection = 1 | -1;

interface RouteTransitionContextValue {
  activePathname: string;
  direction: RouteTransitionDirection;
  isRouteTransitioning: boolean;
  navigateWithTransition: (href: string) => void;
  phase: RouteTransitionPhase;
  prefetchRoute: (href: string) => void;
}

interface RouteTransitionNavigationContextValue {
  activePathname: string;
  navigateWithTransition: (href: string) => void;
  prefetchRoute: (href: string) => void;
  registerNavigationSnapshotPreparation: (prepare: (() => void) | null) => void;
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
  const [frozenNavPathname, setFrozenNavPathname] = useState<string | null>(null);
  const navigationResolverRef = useRef<(() => void) | null>(null);
  const navigationTimeoutRef = useRef<number | null>(null);
  const navigationPreparationRef = useRef<(() => void) | null>(null);
  const pathnameRef = useRef(pathname);
  const phaseRef = useRef<RouteTransitionPhase>(phase);

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

  const cleanupTransitionMarkers = useCallback(() => {
    const root = document.documentElement;
    delete root.dataset.routeTransition;
    delete root.dataset.routeTransitionActive;
    delete root.dataset.routeTransitionHideLiveNav;
  }, []);

  const finalizeTransition = useCallback(() => {
    clearNavigationWait();
    cleanupTransitionMarkers();
    setFrozenNavPathname(null);
    setPendingPath(null);
    setPhase("idle");
  }, [clearNavigationWait, cleanupTransitionMarkers]);

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

    navigationResolverRef.current();
    clearNavigationWait();
  }, [clearNavigationWait, pathname, pendingPath]);

  useEffect(
    () => () => {
      clearNavigationWait();
      cleanupTransitionMarkers();
    },
    [clearNavigationWait, cleanupTransitionMarkers]
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
      const transitionDocument = document;

      flushSync(() => {
        navigationPreparationRef.current?.();
        setDirection(nextDirection);
        setPendingPath(targetPath);
        setFrozenNavPathname(currentPathname);
        setPhase("animating");
      });

      root.dataset.routeTransition = nextDirection === 1 ? "forward" : "backward";
      root.dataset.routeTransitionActive = "true";

      const waitForNavigation = () =>
        new Promise<void>((resolve) => {
          root.dataset.routeTransitionHideLiveNav = "true";
          navigationResolverRef.current = resolve;
          navigationTimeoutRef.current = window.setTimeout(() => {
            resolve();
            clearNavigationWait();
          }, NAVIGATION_TIMEOUT_MS);

          startTransition(() => {
            router.push(targetPath);
          });
        });

      if (typeof transitionDocument.startViewTransition !== "function") {
        void waitForNavigation().finally(() => {
          finalizeTransition();
        });
        return;
      }

      const transition = transitionDocument.startViewTransition(waitForNavigation);
      transition.finished.catch(() => undefined).finally(() => {
        finalizeTransition();
      });
    },
    [clearNavigationWait, finalizeTransition, prefetchRoute, router]
  );

  const activePathname = frozenNavPathname ?? pathname;

  const navigationValue = useMemo(
    () => ({
      activePathname,
      navigateWithTransition,
      prefetchRoute,
      registerNavigationSnapshotPreparation,
    }),
    [
      activePathname,
      navigateWithTransition,
      prefetchRoute,
      registerNavigationSnapshotPreparation,
    ]
  );

  const stateValue = useMemo(
    () => ({
      activePathname,
      direction,
      isRouteTransitioning: phase !== "idle",
      navigateWithTransition,
      phase,
      prefetchRoute,
    }),
    [activePathname, direction, navigateWithTransition, phase, prefetchRoute]
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
  const { activePathname, direction, isRouteTransitioning, phase } =
    useRouteTransitionStateContext();

  return {
    activePathname,
    direction,
    isRouteTransitioning,
    phase,
  };
}

export function RouteTransitionShell({ children }: { children: ReactNode }) {
  const { phase } = useRouteTransitionStateContext();

  return (
    <div
      className="route-transition-stage relative isolate min-h-screen overflow-x-clip"
      data-route-transition-phase={phase}
    >
      {children}
    </div>
  );
}
