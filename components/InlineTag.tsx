import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onClick?: () => void;
  color?: string;
}>;

export function InlineTag({ children }: Props) {

  return (
    <div
      className="inline-tag"
    >
      {children}
    </div>
  );
}
