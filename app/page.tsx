"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import MockupStudio from "@/components/MockupStudio";

export default function Home() {
  const [showStudio, setShowStudio] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      {!showStudio ? (
        <Hero onGetStarted={() => setShowStudio(true)} />
      ) : (
        <MockupStudio />
      )}
    </main>
  );
}
