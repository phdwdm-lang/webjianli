"use client";

import { ABOUT_CAPABILITIES } from "@/constants/about";
import CapabilityFlipCard from "./CapabilityFlipCard";

export default function CapabilitiesCard() {
  return (
    <section className="grid grid-cols-1 gap-4 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-4">
      {ABOUT_CAPABILITIES.map((capability, index) => (
        <CapabilityFlipCard
          key={capability.title}
          title={capability.title}
          backTitle={capability.backTitle}
          items={capability.items}
          icon={capability.icon}
          delay={0.4 + index * 0.08}
        />
      ))}
    </section>
  );
}
