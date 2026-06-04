import Lightfall from './Lightfall'
import './AboutText.css'

export default function AboutText() {
  return (
    <div className="about-overlay">
      {/* Lightfall animated background */}
      <div className="lightfall-bg">
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A29FF"
          speed={0.5}
          streakCount={2}
          streakWidth={0.4}
          streakLength={1}
          glow={1.1}
          density={0.5}
          twinkle={0.95}
          zoom={3}
          backgroundGlow={0.5}
          opacity={0.4}
          mouseInteraction={false}
        />
      </div>

      {/* Info cards */}
      <div className="about-cards">
        {/* Name card */}
        <div className="about-card name-card">
          <h3>Henok</h3>
          <p>📍 Ethiopia</p>
        </div>

        {/* Bio card */}
        <div className="about-card bio-card">
          <p>Builds immersive 3D web experiences and interactive systems that are fast, responsive, and fun to use.</p>
        </div>

        {/* Skills card */}
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
