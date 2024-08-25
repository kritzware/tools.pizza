import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onClick?: () => void;
  color?: string;
}>;

export function KeyboardShortcut({ onClick, children, color }: Props) {
  const className = `${color ? color : "primary"} keyboard-shortcut`;

  return (
    <div
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
}
