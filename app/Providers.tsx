"use client";
import React from "react";
import { EdgeStoreProvider } from "@/lib/edgestore";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </>
  );
}

export default Providers;
