import Lightfall from './Lightfall'
import './AboutText.css'
import { useEffect, useRef } from 'react'

export default function AboutText() {
  const containerRef = useRef(null)

  // Fade in the cards after scrolling past the Hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = window.innerHeight
      // Cards start fading when we enter the About section (after first viewport)
      const t = Math.min(Math.max((scrollY - height) / height, 0), 1)
      if (containerRef.current) {
        // Ensure the overlay stays visible
        containerRef.current.style.opacity = 1
        // Apply opacity to each card
        const cards = containerRef.current.querySelectorAll('.about-card')
        cards.forEach((card) => (card.style.opacity = t))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initialise on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="about-overlay" ref={containerRef} style={{ opacity: 1 }}>
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
