import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import SceneContent from "./SceneContent";
import SceneBackground from "./SceneBackground";
import LightRays from "./LightRays";
import TiltedCard from "./TiltedCard";
import "./MainScene.css";

export default function MainScene() {
  const aboutCardsRef = useRef(null);

  // Fade in about cards as user scrolls into the About section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      // t goes 0→1 as user scrolls (completes at 75% of viewport)
      const t = Math.min(scrollY / (height * 0.75), 1);
      if (aboutCardsRef.current) {
        const cards = aboutCardsRef.current.querySelectorAll(".about-card-wrapper");
        cards.forEach((card) => {
          card.style.opacity = t;
        });
        const lightfallBg = document.querySelector(".lightfall-bg");
        if (lightfallBg) {
          lightfallBg.style.opacity = t;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero text — normal DOM, scrolls with page */}
      <div className="hero-text-overlay">
        <h1>
          Hi, my
          <br />
          name is <span className="highlight">Henok.</span>
        </h1>
        <p>I love building beautiful digital experiences.</p>
        <a href="#projects" className="btn">
          Get in touch
        </a>
      </div>

      {/* About overlay — second screen */}
      <div id="about" className="about-overlay-dom" ref={aboutCardsRef}>

        <div className="about-cards">
          <div className="about-card-wrapper name-card">
            <TiltedCard
              containerWidth="180px"
              containerHeight="90px"
              imageWidth="100%"
              imageHeight="100%"
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="glass-panel">
                  <h3>Henok</h3>
                  <p>📍 Ethiopia</p>
                </div>
              }
            />
          </div>

          <div className="about-card-wrapper bio-card">
            <TiltedCard
              containerWidth="230px"
              containerHeight="140px"
              imageWidth="100%"
              imageHeight="100%"
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="glass-panel">
                  <p>
                    Builds immersive 3D web experiences and interactive systems that
                    are fast, responsive, and fun to use.
                  </p>
                </div>
              }
            />
          </div>

          <div className="about-card-wrapper skills-card">
            <TiltedCard
              containerWidth="200px"
              containerHeight="220px"
              imageWidth="100%"
              imageHeight="100%"
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="glass-panel">
                  <h4>Skills</h4>
                  <ul>
                    <li>Three.js &amp; WebGL</li>
                    <li>React &amp; Next.js</li>
                    <li>Node.js &amp; Express</li>
                    <li>TypeScript</li>
                    <li>Python &amp; Django</li>
                  </ul>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Sticky canvas — fixed height, sticks while scrolling hero+about */}
      <div className="canvas-sticky-wrapper">
        {/* LightRays background (fades in via scroll, behind 3D canvas) */}
        <div className="lightfall-bg">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00C8FF"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        <Canvas
          camera={{ position: [0, 3.5, 6], fov: 42 }}
          shadows
          gl={{ logarithmicDepthBuffer: true, antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <SceneBackground />
            <SceneContent />
            {/* Ambient contact shadows for soft ambient occlusion */}
            <ContactShadows
              position={[0, -0.5, 0]}
              opacity={0.08}
              scale={20}
              blur={2}
              resolution={1024}
              far={10}
            />

            {/* Directional light shadow receiver floor */}
            <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <shadowMaterial opacity={0.03} />
            </mesh>
            <Environment preset="warehouse" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
