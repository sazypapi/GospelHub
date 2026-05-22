// import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";
import React from "react";

function Containers({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-full sm:max-w-[80%] ", className)}>
      {children}
    </div>
  );
}

export default Containers;
