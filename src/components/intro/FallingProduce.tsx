"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProduceSvg, ProduceType } from "./ProduceSvg";

interface ProduceItemConfig {
  id: string;
  type: ProduceType;
  name: string;
  // Landing coordinates relative to center of the plate (in px for standard base)
  targetX: number;
  targetY: number;
  rotation: number;
  scale: number;
  dropDelay: number;
  startOffsetX: number;
}

const PRODUCE_CONFIGS: ProduceItemConfig[] = [
  {
    id: "broccoli-1",
    type: "broccoli",
    name: "Broccoli",
    targetX: -38,
    targetY: -22,
    rotation: -12,
    scale: 1.05,
    dropDelay: 0.2,
    startOffsetX: -40,
  },
  {
    id: "carrot-1",
    type: "carrot",
    name: "Carrot",
    targetX: 25,
    targetY: -15,
    rotation: 35,
    scale: 1.1,
    dropDelay: 0.45,
    startOffsetX: 30,
  },
  {
    id: "tomato-1",
    type: "tomato",
    name: "Tomato",
    targetX: -15,
    targetY: 28,
    rotation: 8,
    scale: 1.0,
    dropDelay: 0.7,
    startOffsetX: -10,
  },
  {
    id: "lemon-1",
    type: "lemon",
    name: "Lemon",
    targetX: 42,
    targetY: 20,
    rotation: -22,
    scale: 0.95,
    dropDelay: 0.95,
    startOffsetX: 50,
  },
  {
    id: "onion-1",
    type: "onion",
    name: "Red Onion",
    targetX: -48,
    targetY: 15,
    rotation: 14,
    scale: 0.92,
    dropDelay: 1.15,
    startOffsetX: -60,
  },
  {
    id: "apple-1",
    type: "apple",
    name: "Apple",
    targetX: 6,
    targetY: -40,
    rotation: -6,
    scale: 0.95,
    dropDelay: 1.35,
    startOffsetX: 10,
  },
  {
    id: "chili-1",
    type: "chili",
    name: "Chili Pepper",
    targetX: 18,
    targetY: 42,
    rotation: -45,
    scale: 0.9,
    dropDelay: 1.55,
    startOffsetX: 25,
  },
  {
    id: "avocado-1",
    type: "avocado",
    name: "Avocado",
    targetX: -5,
    targetY: -2,
    rotation: 10,
    scale: 0.95,
    dropDelay: 1.75,
    startOffsetX: -5,
  },
];

// Delicate herbs & seasoning flecks
const GARNISHES = [
  { id: "g1", x: -55, y: -45, color: "#65A30D", delay: 1.85, size: 6 },
  { id: "g2", x: 45, y: -38, color: "#84CC16", delay: 1.95, size: 5 },
  { id: "g3", x: -28, y: 52, color: "#DC2626", delay: 2.05, size: 4 },
  { id: "g4", x: 32, y: 48, color: "#65A30D", delay: 2.15, size: 5 },
  { id: "g5", x: 55, y: 0, color: "#F59E0B", delay: 2.25, size: 4 },
];

export function FallingProduce({ isReplaying }: { isReplaying?: boolean }) {
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const handleHop = (id: string) => {
    setClickedItem(id);
    setTimeout(() => {
      setClickedItem((prev) => (prev === id ? null : prev));
    }, 450);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
      <AnimatePresence mode="wait">
        <div key={isReplaying ? "replay" : "initial"} className="relative w-full h-full flex items-center justify-center">
          {/* Main falling vegetables and fruits */}
          {PRODUCE_CONFIGS.map((item) => {
            const isHopping = clickedItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{
                  y: -360,
                  x: item.targetX + item.startOffsetX,
                  opacity: 0,
                  rotate: item.rotation - 60,
                  scale: 0.7,
                }}
                animate={{
                  y: isHopping ? item.targetY - 26 : item.targetY,
                  x: item.targetX,
                  opacity: 1,
                  rotate: isHopping ? item.rotation + 15 : item.rotation,
                  scale: isHopping ? item.scale * 1.15 : item.scale,
                }}
                transition={{
                  y: {
                    type: "spring",
                    stiffness: 110,
                    damping: 12,
                    mass: 0.85,
                    delay: item.dropDelay,
                  },
                  x: {
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                    delay: item.dropDelay,
                  },
                  rotate: {
                    type: "spring",
                    stiffness: 100,
                    damping: 11,
                    delay: item.dropDelay,
                  },
                  opacity: { duration: 0.25, delay: item.dropDelay },
                  scale: { duration: 0.2 },
                }}
                whileHover={{
                  scale: item.scale * 1.12,
                  rotate: item.rotation + 5,
                  cursor: "pointer",
                }}
                onClick={() => handleHop(item.id)}
                title={`Click to bounce ${item.name}!`}
                className="absolute z-10 select-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] cursor-pointer"
              >
                <ProduceSvg type={item.type} size={54} />
              </motion.div>
            );
          })}

          {/* Gentle herb garnishes and chili flecks landing gently */}
          {GARNISHES.map((g) => (
            <motion.div
              key={g.id}
              initial={{ y: -380, opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{
                y: g.y,
                x: g.x,
                opacity: 0.85,
                scale: 1,
                rotate: 45,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 16,
                delay: g.delay,
              }}
              style={{
                width: g.size,
                height: g.size,
                backgroundColor: g.color,
                borderRadius: "40% 60% 70% 30% / 40% 50% 60% 70%",
              }}
              className="absolute pointer-events-none shadow-sm"
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
