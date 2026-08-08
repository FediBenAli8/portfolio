import { useEffect, useRef } from "react";

/**
 * InteractiveLens
 *
 * Sits below elements. Centers a transparent magnifying viewport over the mouse cursor,
 * revealing a detailed neon-blue grid/blueprint template underneath.
 */
export default function InteractiveLens() {
  const lensRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${x - 75}px, ${y - 75}px, 0)`;
      }

      if (gridRef.current) {
        gridRef.current.style.setProperty("--x", `${x}px`);
        gridRef.current.style.setProperty("--y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={gridRef} className="lens-grid" aria-hidden="true" />
      <div ref={lensRef} className="lens-follower" aria-hidden="true" />
    </>
  );
}
