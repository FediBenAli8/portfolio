import { useEffect, useRef } from "react";

/**
 * AmbientOrbs
 *
 * Two highly interactive blurred floating gradient orbs in the background.
 * User can click and drag them to shift the background refraction / light source.
 * Utilizes high-performance pointer events and setPointerCapture for smooth dragging.
 */
export default function AmbientOrbs() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const dragInfo = useRef({
    active: null,
    offsetX: 0,
    offsetY: 0
  });

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Initial positions
    const pos = {
      orb1: { x: w * 0.25, y: h * 0.35 },
      orb2: { x: w * 0.70, y: h * 0.65 }
    };

    const updatePosition = (orbId, x, y) => {
      const el = orbId === "orb1" ? orb1Ref.current : orb2Ref.current;
      if (!el) return;
      pos[orbId] = { x, y };
      const radius = orbId === "orb1" ? 350 : 275;
      el.style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0)`;
    };

    // Apply initials
    updatePosition("orb1", pos.orb1.x, pos.orb1.y);
    updatePosition("orb2", pos.orb2.x, pos.orb2.y);

    const onPointerDown = (orbId, e) => {
      e.stopPropagation();
      dragInfo.current = {
        active: orbId,
        offsetX: e.clientX - pos[orbId].x,
        offsetY: e.clientY - pos[orbId].y
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.classList.add("dragging");
    };

    const onPointerMove = (e) => {
      const active = dragInfo.current.active;
      if (!active) return;
      const x = e.clientX - dragInfo.current.offsetX;
      const y = e.clientY - dragInfo.current.offsetY;
      updatePosition(active, x, y);
    };

    const onPointerUp = (e) => {
      const active = dragInfo.current.active;
      if (!active) return;
      e.currentTarget.classList.remove("dragging");
      dragInfo.current.active = null;
    };

    const orb1El = orb1Ref.current;
    const orb2El = orb2Ref.current;

    const o1Down = (e) => onPointerDown("orb1", e);
    const o2Down = (e) => onPointerDown("orb2", e);

    if (orb1El) {
      orb1El.addEventListener("pointerdown", o1Down);
      orb1El.addEventListener("pointermove", onPointerMove);
      orb1El.addEventListener("pointerup", onPointerUp);
    }
    if (orb2El) {
      orb2El.addEventListener("pointerdown", o2Down);
      orb2El.addEventListener("pointermove", onPointerMove);
      orb2El.addEventListener("pointerup", onPointerUp);
    }

    return () => {
      if (orb1El) {
        orb1El.removeEventListener("pointerdown", o1Down);
        orb1El.removeEventListener("pointermove", onPointerMove);
        orb1El.removeEventListener("pointerup", onPointerUp);
      }
      if (orb2El) {
        orb2El.removeEventListener("pointerdown", o2Down);
        orb2El.removeEventListener("pointermove", onPointerMove);
        orb2El.removeEventListener("pointerup", onPointerUp);
      }
    };
  }, []);

  return (
    <div className="ambient-orbs" aria-hidden="true">
      <div 
        ref={orb1Ref} 
        className="ambient-orb ambient-orb--1 draggable-orb" 
        style={{ pointerEvents: "auto", willChange: "transform" }}
      >
        <div className="orb-handle" />
      </div>
      <div 
        ref={orb2Ref} 
        className="ambient-orb ambient-orb--2 draggable-orb" 
        style={{ pointerEvents: "auto", willChange: "transform" }}
      >
        <div className="orb-handle" />
      </div>
    </div>
  );
}
