"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

export default function Reveal({
  as: Tag = "section",
  children,
  className = "",
  delay = 0,
  style,
  ...props
}) {
  const elementRef = useRef(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const alreadyVisible =
      element.getBoundingClientRect().top <= window.innerHeight * 0.92;

    if (alreadyVisible) {
      const frame = window.requestAnimationFrame(() => setState("visible"));
      return () => window.cancelAnimationFrame(frame);
    }

    const frame = window.requestAnimationFrame(() => setState("pending"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setState("visible");
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(element);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={elementRef}
      className={`${styles.reveal} ${styles[state] || ""} ${className}`}
      data-reveal-state={state}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
