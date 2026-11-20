import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CookingProvider } from "@/context/CookingContext";
import { ThemeProvider } from "@/context/ThemeContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Make It Work - Meals | Turn Whatever You Have Into Delicious Food",
  description:
    "An appetizing, smart cooking assistant that turns your available fridge and pantry ingredients into 3 personalized, chef-quality recipes using Google Gemini AI.",
  keywords: [
    "recipe generator",
    "pantry meal planner",
    "what to cook",
    "leftover recipes",
    "cooking assistant",
    "Gemini AI meals",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAF6ED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Inline script to apply dark class before first paint — prevents theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('miw-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(t==='light'){document.documentElement.classList.remove('dark');}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <CookingProvider>{children}</CookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
