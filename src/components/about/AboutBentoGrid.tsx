"use client";

import { motion } from "framer-motion";
import CapabilitiesCard from "./CapabilitiesCard";
import HikerCard from "./HikerCard";
import HobbiesCard from "./HobbiesCard";
import LocationCard from "./LocationCard";
import MbtiCard from "./MbtiCard";
import ProfileCard from "./ProfileCard";
import ToolsCard from "./ToolsCard";

const itemMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function AboutBentoGrid() {
  return (
    <div className="relative w-full">
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 min-[481px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1025px]:grid-cols-4">
        <motion.div
          className="col-span-1 h-full row-span-2 min-[481px]:col-span-2"
          transition={{ duration: 0.45 }}
          {...itemMotion}
        >
          <ProfileCard />
        </motion.div>

        <motion.div
          className="col-span-1 h-full row-span-1 min-[769px]:row-span-2"
          transition={{ duration: 0.45, delay: 0.06 }}
          {...itemMotion}
        >
          <HikerCard />
        </motion.div>

        <motion.div
          className="col-span-1 h-full"
          transition={{ duration: 0.45, delay: 0.12 }}
          {...itemMotion}
        >
          <LocationCard />
        </motion.div>

        <motion.div
          className="col-span-1 h-full"
          transition={{ duration: 0.45, delay: 0.16 }}
          {...itemMotion}
        >
          <MbtiCard />
        </motion.div>

        <motion.div
          className="col-span-1 h-full min-[481px]:col-span-2 min-[769px]:col-span-3 min-[1025px]:col-span-2"
          transition={{ duration: 0.45, delay: 0.2 }}
          {...itemMotion}
        >
          <HobbiesCard />
        </motion.div>

        <motion.div
          className="col-span-1 h-full min-[481px]:col-span-2 min-[769px]:col-span-3 min-[1025px]:col-span-2"
          transition={{ duration: 0.45, delay: 0.24 }}
          {...itemMotion}
        >
          <ToolsCard />
        </motion.div>

        <motion.div
          className="col-span-1 h-full min-[481px]:col-span-2 min-[769px]:col-span-3 min-[1025px]:col-span-4"
          transition={{ duration: 0.45, delay: 0.28 }}
          {...itemMotion}
        >
          <CapabilitiesCard />
        </motion.div>
      </div>
    </div>
  );
}
