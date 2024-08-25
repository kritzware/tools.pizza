import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onClick?: () => void;
  hasShortcut?: boolean;
  color?: string;
}>;

export function Button({ onClick, children, hasShortcut, color }: Props) {
  const className = `${hasShortcut ? "has-shortcut" : ""} ${color ? color : "primary"}`.trim();

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

