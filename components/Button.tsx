import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onClick?: () => void;
}>;

export function Button(props: Props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
