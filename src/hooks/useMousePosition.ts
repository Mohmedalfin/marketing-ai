import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", update);

    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, []);

  return position;
}