import React, { ReactNode } from "react";

export const RichText = ({
  children,
  align,
}: {
  children: ReactNode;
  align?: "left";
}) => (
  <div
    className={`prose mx-auto text-lg leading-normal [&_h1]:text-4xl xl:[&_h1]:text-5xl [&_p]:text-sm mb-2 ${
      align === "left" ? `ml-0` : ""
    }`}
  >
    {children}
  </div>
);
