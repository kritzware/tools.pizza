import React from "react";

interface ButtonProps {
  icon?: "format" | "copy" | "theme";
  onClick?: () => void;
}

export default function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={props.onClick}>
      {props.icon && props.icon === "format" && (
        <svg
          style={{
            marginRight: typeof props.children !== "undefined" ? "10px" : 0,
          }}
          width="16"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0h16v2H0V0zm0 12h16v2H0v-2zm0-4h6v2H0V8zm0-4h6v2H0V4zm12 2V3l4 4-4 4V8H8V6h4z"
            fill="#FFF"
            fillRule="nonzero"
          />
        </svg>
      )}
      {props.icon && props.icon === "copy" && (
        <svg
          style={{
            marginRight: typeof props.children !== "undefined" ? "10px" : 0,
          }}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h7zM5 4v10H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2H6c-.6 0-1 .4-1 1z"
            fill="#FFF"
            fillRule="nonzero"
          />
        </svg>
      )}
      {props.icon && props.icon === "theme" && (
        <div
          style={{
            marginRight: typeof props.children !== "undefined" ? "10px" : 0,
          }}
        >
          <span style={{ fontSize: 21 }}>🌞</span>
        </div>
      )}
      {props.children}
    </button>
  );
}
