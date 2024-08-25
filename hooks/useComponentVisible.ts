import { useState, useRef } from "react";

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  return { ref, isComponentVisible, setIsComponentVisible };
}
