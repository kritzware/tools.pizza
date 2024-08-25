import { ReactNode } from "react";

interface ToolbarProps {
  children?: ReactNode;
}

export function Toolbar({ children }: ToolbarProps) {
  return <div className="toolbar">{children}</div>;
}
