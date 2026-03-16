import { useEffect, useState } from "react";
import useMousePosition from "../../hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    const addEvents = () => {
      document.querySelectorAll("button, a").forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant("button"));
        el.addEventListener("mouseleave", () => setVariant("default"));
      });

      document.querySelectorAll(".cursor-card").forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant("card"));
        el.addEventListener("mouseleave", () => setVariant("default"));
      });
    };

    addEvents();
  }, []);

  const variants: Record<string, string> = {
    default: "h-6 w-6 bg-green-400/30",
    button: "h-12 w-12 bg-green-400/20 border border-green-400",
    card: "h-16 w-16 bg-green-400/10 border border-green-400 backdrop-blur-md"
  };

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color,border-color] duration-200 ${variants[variant]}`}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
    />
  );
}