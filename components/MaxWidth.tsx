import { ReactNode } from "react";
import cx from "classnames";

interface Properties {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export const MaxWidth = ({
  children,
  size = "xl",
}: Properties): JSX.Element => {
  const maxWidthClass = () => {
    switch (size) {
      case "sm": {
        return "max-w-screen-sm";
      }
      case "md": {
        return "max-w-screen-md";
      }
      case "lg": {
        return "max-w-screen-lg";
      }
      default: {
        return "max-w-screen-xl";
      }
    }
  };
  return (
    <div className={cx("mx-auto w-full px-side", maxWidthClass())}>
      {children}
    </div>
  );
};
