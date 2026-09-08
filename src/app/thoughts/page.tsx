import type { CSSProperties } from "react";
import { ThoughtsCanvas } from "@/app/thoughts/components/ThoughtsCanvas";
import { CSS_VARS } from "@/constants/theme";

export default function ThoughtsPage() {
  return (
    <div
      className="section-page relative overflow-hidden"
      style={
        {
          "--section-color": CSS_VARS.themeThoughts,
        } as CSSProperties
      }
    >
      <ThoughtsCanvas />
    </div>
  );
}
