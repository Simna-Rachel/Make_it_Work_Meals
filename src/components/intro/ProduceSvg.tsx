"use client";

import React from "react";

export type ProduceType =
  | "carrot"
  | "tomato"
  | "broccoli"
  | "lemon"
  | "apple"
  | "onion"
  | "chili"
  | "bell_pepper"
  | "avocado"
  | "mushroom";

interface ProduceSvgProps {
  type: ProduceType;
  className?: string;
  size?: number;
}

export function ProduceSvg({ type, className = "", size = 48 }: ProduceSvgProps) {
  switch (type) {
    case "carrot":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Leaves */}
          <path
            d="M44 14C48 8 54 8 56 6C54 12 50 16 46 18"
            stroke="#4D7C0F"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M48 10C53 4 59 3 61 2C60 8 57 13 51 15"
            stroke="#65A30D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M42 16C45 10 50 9 52 7C50 13 47 17 44 19"
            stroke="#84CC16"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Carrot Body */}
          <path
            d="M44 18C47 21 46 26 42 31L16 57C14 59 11 59 9 57C7 55 7 52 9 50L35 24C40 20 42 16 44 18Z"
            fill="url(#carrot-grad)"
          />
          {/* Texture notches */}
          <path d="M37 25C35 26 34 27 34 28" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M29 33C27 34 26 35 26 36" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 41C19 42 18 43 18 44" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          {/* Highlight */}
          <path
            d="M39 21L15 45"
            stroke="#FDBA74"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
          <defs>
            <linearGradient id="carrot-grad" x1="45" y1="17" x2="10" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="0.6" stopColor="#F97316" />
              <stop offset="1" stopColor="#C2410C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "tomato":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Tomato Body */}
          <circle cx="32" cy="36" r="22" fill="url(#tomato-grad)" />
          {/* Highlights */}
          <ellipse cx="25" cy="28" rx="6" ry="3.5" transform="rotate(-30 25 28)" fill="#FECACA" fillOpacity="0.7" />
          <circle cx="21" cy="24" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
          {/* Stem & Leaves */}
          <path
            d="M32 18V11C32 10 33 9 34 9"
            stroke="#3F6212"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M32 17C29 14 23 15 20 18C24 19 28 18 32 17Z"
            fill="#65A30D"
          />
          <path
            d="M32 17C35 14 41 15 44 18C40 19 36 18 32 17Z"
            fill="#65A30D"
          />
          <path
            d="M32 18C31 22 28 24 26 25C28 23 31 21 32 18Z"
            fill="#4D7C0F"
          />
          <path
            d="M32 18C33 22 36 24 38 25C36 23 33 21 32 18Z"
            fill="#4D7C0F"
          />
          <defs>
            <radialGradient id="tomato-grad" cx="26" cy="28" r="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F87171" />
              <stop offset="0.5" stopColor="#EF4444" />
              <stop offset="0.9" stopColor="#B91C1C" />
            </radialGradient>
          </defs>
        </svg>
      );

    case "broccoli":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Stalk */}
          <path
            d="M27 38L25 54C25 56 27 58 29 58H35C37 58 39 56 39 54L37 38"
            fill="#84CC16"
          />
          <path
            d="M29 44C31 46 33 46 35 44"
            stroke="#4D7C0F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Main florets */}
          <circle cx="32" cy="24" r="14" fill="#15803D" />
          <circle cx="21" cy="28" r="11" fill="#16A34A" />
          <circle cx="43" cy="28" r="11" fill="#16A34A" />
          <circle cx="32" cy="18" r="10" fill="#22C55E" />
          <circle cx="25" cy="22" r="8" fill="#4ADE80" fillOpacity="0.8" />
          <circle cx="39" cy="22" r="8" fill="#4ADE80" fillOpacity="0.8" />
          {/* Florets texture dots */}
          <circle cx="28" cy="18" r="1.5" fill="#86EFAC" />
          <circle cx="35" cy="17" r="1.5" fill="#86EFAC" />
          <circle cx="22" cy="25" r="1.5" fill="#86EFAC" />
          <circle cx="42" cy="25" r="1.5" fill="#86EFAC" />
        </svg>
      );

    case "lemon":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Lemon body tips */}
          <path
            d="M12 28C10 32 10 34 14 36C18 48 30 54 44 48C52 44 55 36 54 28C53 16 38 10 24 16C18 19 14 24 12 28Z"
            fill="url(#lemon-grad)"
          />
          <path
            d="M10 32C8 31 7 33 8 34C10 35 12 34 13 33"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M54 28C56 29 57 27 56 26C54 25 52 26 51 27"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Leaf */}
          <path
            d="M48 18C52 12 58 10 61 10C61 14 58 20 52 22"
            fill="#65A30D"
          />
          <path
            d="M49 18L58 12"
            stroke="#3F6212"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Subtle zest speckles and gleam */}
          <ellipse cx="28" cy="24" rx="8" ry="4" transform="rotate(-20 28 24)" fill="#FEF08A" fillOpacity="0.8" />
          <circle cx="26" cy="22" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
          <defs>
            <radialGradient id="lemon-grad" cx="30" cy="28" r="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="0.7" stopColor="#EAB308" />
              <stop offset="1" stopColor="#CA8A04" />
            </radialGradient>
          </defs>
        </svg>
      );

    case "apple":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Stem */}
          <path
            d="M32 20C32 15 36 10 40 8"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Leaf */}
          <path
            d="M34 16C39 12 45 13 47 15C46 19 40 21 35 18Z"
            fill="#84CC16"
          />
          {/* Apple Body with slight top dimple */}
          <path
            d="M32 22C26 18 14 18 12 28C10 39 16 52 26 54C30 55 31 52 32 52C33 52 34 55 38 54C48 52 54 39 52 28C50 18 38 18 32 22Z"
            fill="url(#apple-grad)"
          />
          {/* Gleam */}
          <ellipse cx="22" cy="29" rx="5" ry="8" transform="rotate(-25 22 29)" fill="#FFFFFF" fillOpacity="0.45" />
          <circle cx="19" cy="25" r="2" fill="#FFFFFF" fillOpacity="0.8" />
          <defs>
            <radialGradient id="apple-grad" cx="24" cy="26" r="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EF4444" />
              <stop offset="0.65" stopColor="#DC2626" />
              <stop offset="1" stopColor="#991B1B" />
            </radialGradient>
          </defs>
        </svg>
      );

    case "onion":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Sprout tip */}
          <path d="M32 14C33 8 36 5 38 4" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 15C29 10 27 7 25 6" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
          {/* Bulb */}
          <path
            d="M32 14C23 19 13 28 14 41C15 50 23 57 32 57C41 57 49 50 50 41C51 28 41 19 32 14Z"
            fill="url(#onion-grad)"
          />
          {/* Onion layers lines */}
          <path d="M26 18C20 25 20 43 26 53" stroke="#A855F7" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M38 18C44 25 44 43 38 53" stroke="#A855F7" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M32 17V56" stroke="#A855F7" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
          {/* Roots */}
          <path d="M30 58L29 62" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 58L32 63" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M34 58L35 62" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <radialGradient id="onion-grad" cx="28" cy="30" r="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5D0FE" />
              <stop offset="0.5" stopColor="#D946EF" />
              <stop offset="1" stopColor="#7E22CE" />
            </radialGradient>
          </defs>
        </svg>
      );

    case "chili":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Cap & Stem */}
          <path
            d="M48 12C49 8 53 6 56 6"
            stroke="#15803D"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M43 14C45 12 50 14 52 18C48 20 44 18 43 14Z"
            fill="#16A34A"
          />
          {/* Chili curve */}
          <path
            d="M48 18C44 28 35 39 24 47C17 52 10 56 7 57C6 57 6 56 7 55C11 48 14 36 24 26C31 18 39 15 48 18Z"
            fill="url(#chili-grad)"
          />
          {/* Gleam */}
          <path
            d="M41 21C35 28 28 37 20 44"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <defs>
            <linearGradient id="chili-grad" x1="48" y1="16" x2="8" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EF4444" />
              <stop offset="0.6" stopColor="#DC2626" />
              <stop offset="1" stopColor="#991B1B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "bell_pepper":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Stem */}
          <path d="M32 16V9C32 8 33 7 35 7" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          {/* Lobes */}
          <path
            d="M20 22C14 26 13 42 18 50C21 54 26 54 28 50C27 40 27 30 28 22C24 20 22 20 20 22Z"
            fill="#FBBF24"
          />
          <path
            d="M44 22C50 26 51 42 46 50C43 54 38 54 36 50C37 40 37 30 36 22C40 20 42 20 44 22Z"
            fill="#D97706"
          />
          <path
            d="M27 20C24 20 23 48 26 53C28 55 36 55 38 53C41 48 40 20 37 20C34 19 30 19 27 20Z"
            fill="#F59E0B"
          />
          <ellipse cx="28" cy="27" rx="3" ry="7" transform="rotate(-15 28 27)" fill="#FEF3C7" fillOpacity="0.6" />
        </svg>
      );

    case "avocado":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Dark Skin */}
          <path
            d="M32 8C22 8 16 19 14 31C12 43 18 56 32 56C46 56 52 43 50 31C48 19 42 8 32 8Z"
            fill="#1E3A1E"
          />
          {/* Lime Green Flesh */}
          <path
            d="M32 11C24 11 18 21 16 32C14 43 19 53 32 53C45 53 50 43 48 32C46 21 40 11 32 11Z"
            fill="#A3E635"
          />
          {/* Inner Light Flesh */}
          <circle cx="32" cy="38" r="14" fill="#D9F99D" />
          {/* Seed */}
          <circle cx="32" cy="38" r="9" fill="url(#pit-grad)" />
          <circle cx="30" cy="35" r="2.5" fill="#B45309" fillOpacity="0.7" />
          <circle cx="29" cy="34" r="1" fill="#FFFFFF" fillOpacity="0.8" />
          <defs>
            <radialGradient id="pit-grad" cx="30" cy="36" r="9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#92400E" />
              <stop offset="0.7" stopColor="#78350F" />
              <stop offset="1" stopColor="#451A03" />
            </radialGradient>
          </defs>
        </svg>
      );

    case "mushroom":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Stem */}
          <path
            d="M26 34L25 51C25 54 28 56 32 56C36 56 39 54 39 51L38 34"
            fill="#F5F5F4"
          />
          {/* Cap */}
          <path
            d="M12 36C12 22 21 16 32 16C43 16 52 22 52 36C52 38 50 39 48 39H16C14 39 12 38 12 36Z"
            fill="url(#mushroom-grad)"
          />
          {/* Spots */}
          <circle cx="23" cy="26" r="3" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="36" cy="23" r="3.5" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="43" cy="31" r="2" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="28" cy="33" r="2" fill="#FFFFFF" fillOpacity="0.75" />
          <defs>
            <linearGradient id="mushroom-grad" x1="32" y1="16" x2="32" y2="39" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A8715A" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      return null;
  }
}
