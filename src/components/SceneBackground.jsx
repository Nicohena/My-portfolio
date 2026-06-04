import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Grid } from '@react-three/drei'
import * as THREE from 'three'

const heroColor  = new THREE.Color('#f5f0e8')
const aboutColor = new THREE.Color('#05051a')

export default function SceneBackground() {
  const scroll     = useScroll()
  const platformRef = useRef()
  const ringRef     = useRef()
  const glowRef     = useRef()

  useFrame(({ scene }) => {
    const t = scroll.offset

    // Only transition background in hero range, Lightfall handles about bg
    if (t < 0.5) {
      scene.background = heroColor.clone().lerp(new THREE.Color('#00000000'), t * 2)
    } else {
      scene.background = null // transparent — Lightfall shows through
    }

    // Show/hide platform elements based on scroll
    const platformOpacity = Math.max(0, (t - 0.3) * 3)
    if (platformRef.current) {
      platformRef.current.material.opacity = platformOpacity
      platformRef.current.visible = platformOpacity > 0.01
    }
    if (ringRef.current) {
      ringRef.current.material.opacity = platformOpacity
      ringRef.current.visible = platformOpacity > 0.01
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = platformOpacity * 0.4
      glowRef.current.visible = platformOpacity > 0.01
    }
  })

  return (
    <>
      {/* Ambient lights — dim in hero, bright cyan in about */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[0, -1, 0]} color="#00c8ff" intensity={0} ref={undefined} />

      {/* Hologram platform disc */}
      <mesh ref={platformRef} position={[0, -1.79, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshStandardMaterial
          color="#00c8ff"
          emissive="#00c8ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Platform outer ring */}
      <mesh ref={ringRef} position={[0, -1.78, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, 1.2, 64]} />
        <meshStandardMaterial
          color="#00c8ff"
          emissive="#00c8ff"
          emissiveIntensity={1}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Glow disc underneath */}
      <mesh ref={glowRef} position={[0, -1.8, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial
          color="#00c8ff"
          emissive="#00c8ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0}
        />
      </mesh>
    </>
  )
}
