import './HeroText.css'

export default function HeroText() {
  return (
    <div className="hero-text-overlay">
      <h1>
        Hi, my<br />
        name is <span className="highlight">Henok.</span>
      </h1>
      <p>I love building beautiful digital experiences.</p>
      <a href="#contact" className="btn">Get in touch</a>
    </div>
  )
}
