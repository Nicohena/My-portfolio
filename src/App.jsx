import { useEffect, useRef } from "react";
import MainScene from "./components/MainScene";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Navbar from "./components/Navbar";

function App() {
  const bgRef = useRef(null);

  // Change page background color as user scrolls into about section
  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(window.scrollY / (window.innerHeight * 0.75), 1);
      if (bgRef.current) {
        // Interpolate from cream to dark neutral
        const r = Math.round(245 + (15 - 245) * t);
        const g = Math.round(240 + (15 - 240) * t);
        const b = Math.round(232 + (15 - 232) * t);
        bgRef.current.style.background = `rgb(${r},${g},${b})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={bgRef} style={{ background: "#f5f0e8" }}>
      <Navbar />
      <div id="hero" style={{ position: "relative", height: "200vh" }}>
        <MainScene />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <ContactSection />
    </div>
  );
}

export default App;
