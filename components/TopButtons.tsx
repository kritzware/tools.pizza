import { ReactNode } from "react";

interface TopButtonsProps {
  children?: ReactNode;
}

export function TopButtons({ children }: TopButtonsProps) {
  return <div className="top-buttons">{children}</div>;
}
