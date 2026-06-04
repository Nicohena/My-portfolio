import { useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import SceneContent from './SceneContent'
import SceneBackground from './SceneBackground'
import HeroText from './HeroText'
import ScrollWatcher from './ScrollWatcher'
import './MainScene.css'

export default function MainScene() {

  return (
    <div className="scene-wrapper">
      {/* Three.js canvas — above everything */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 3.5, 6], fov: 42 }}
          shadows
          gl={{ logarithmicDepthBuffer: true, antialias: true, alpha: true }}
        >
          <ScrollControls pages={2} damping={0.25}>
            <Suspense fallback={null}>
              <SceneBackground />
              <SceneContent />
              <ScrollWatcher onScroll={() => {}} />
              <ContactShadows
                position={[0, -1.8, 0]}
                opacity={0.4}
                scale={4}
                blur={2}
              />
              <Environment preset="warehouse" />
            </Suspense>

            <Scroll html>
              <HeroText />
              <AboutOverlay />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  )
}

function AboutOverlay() {
  return (
    <div className="about-overlay">
      <div className="about-cards">
        <div className="about-card name-card">
          <h3>Henok</h3>
          <p>📍 Ethiopia</p>
        </div>
        <div className="about-card bio-card">
          <p>Builds immersive 3D web experiences and interactive systems that are fast, responsive, and fun to use.</p>
        </div>
        <div className="about-card skills-card">
          <h4>Skills</h4>
          <ul>
            <li>Three.js &amp; WebGL</li>
            <li>React &amp; Next.js</li>
            <li>Node.js &amp; Express</li>
            <li>TypeScript</li>
            <li>Python &amp; Django</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
