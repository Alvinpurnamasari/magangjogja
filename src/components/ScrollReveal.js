"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const hiddenTransforms = {
    up: "translateY(70px)",
    down: "translateY(-70px)",
    left: "translateX(-70px)",
    right: "translateX(70px)",
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : hiddenTransforms[direction],
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction:
          "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}