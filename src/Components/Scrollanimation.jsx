import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Scrollanimation() {
  const scrollY = useMotionValue(0);

  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const translateY = useTransform(scrollY, [0, 100], [0, -100]);

  // Update scrollY value on window scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
    />
  );
}
