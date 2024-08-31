import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onClick?: () => void;
  hasShortcut?: boolean;
  color?: string;
  className?: string;
}>;

export function Button({ onClick, children, hasShortcut, color, className: customClassName }: Props) {
  const className = `${customClassName ? customClassName : ""} ${hasShortcut ? "has-shortcut" : ""} ${color ? color : "primary"}`.trim();

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
