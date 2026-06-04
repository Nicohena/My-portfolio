import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import DeskSetup from './DeskSetup'
import FlowerPot from './FlowerPot'

export default function SceneContent() {
  const scroll      = useScroll()
  const charRef     = useRef()
  const fadeGroupRef = useRef() // desk + flower pot — will fade out

  const typing  = useGLTF('/typing.glb')
  const talking = useGLTF('/sitting_and_talking.glb')
  const chair   = useGLTF('/chair.glb')

  const { actions: typingActions, mixer } = useAnimations(typing.animations, charRef)
  const talkingActionRef = useRef(null)

  // Hero state
  const heroX        = -0.28
  const heroY        = -1.8
  const heroScale    = 1.8
  const heroRotation = Math.PI * -0.35

  // About state
  const aboutX        = 0.0
  const aboutY        = -1.8
  const aboutScale    = 2.3
  const aboutRotation = Math.PI * 1.0

  useEffect(() => {
    if (!mixer || !typingActions) return

    const typingAction = typingActions[Object.keys(typingActions)[0]]
    if (typingAction) typingAction.reset().play()

    const talkingClip = talking.animations[0]
    if (talkingClip) {
      talkingActionRef.current = mixer.clipAction(talkingClip, charRef.current)
    }

    // Make all fade-group meshes transparent-capable
    if (fadeGroupRef.current) {
      fadeGroupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone()
          child.material.transparent = true
        }
      })
    }
  }, [mixer, typingActions, talking.animations])

  useFrame(() => {
    if (!charRef.current) return
    const t = scroll.offset

    // Animate character + chair
    charRef.current.position.x = THREE.MathUtils.lerp(heroX, aboutX, t)
    charRef.current.position.y = THREE.MathUtils.lerp(heroY, aboutY, t)
    charRef.current.scale.setScalar(THREE.MathUtils.lerp(heroScale, aboutScale, t))
    charRef.current.rotation.y = THREE.MathUtils.lerp(heroRotation, aboutRotation, t)

    // Fade out desk + flower pot
    if (fadeGroupRef.current) {
      const opacity = THREE.MathUtils.lerp(1, 0, Math.min(t * 2, 1)) // fade by 50% scroll
      fadeGroupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = opacity
        }
      })
      fadeGroupRef.current.visible = opacity > 0.01
    }

    // Animation crossfade
    const typingAction  = typingActions?.[Object.keys(typingActions  || {})[0]]
    const talkingAction = talkingActionRef.current

    if (typingAction && talkingAction) {
      if (t > 0.6 && !talkingAction.isRunning()) {
        talkingAction.reset().play()
        typingAction.crossFadeTo(talkingAction, 0.5, true)
      } else if (t < 0.4 && !typingAction.isRunning()) {
        typingAction.reset().play()
        talkingAction.crossFadeTo(typingAction, 0.5, true)
      }
    }
  })

  return (
    <>
      {/* Fade group — desk and flower pot disappear on scroll */}
      <group ref={fadeGroupRef}>
        <DeskSetup />
        <FlowerPot position={[2.5, -1.8, 0.5]} />
      </group>

      {/* Character + chair — scroll animated */}
      <group
        ref={charRef}
        position={[heroX, heroY, 0.99]}
        scale={heroScale}
        rotation={[0, heroRotation, 0]}
      >
        <primitive object={typing.scene} />
        <primitive
          object={chair.scene}
          position={[0, 0, 0]}
          scale={0.0083}
          rotation={[0, Math.PI, 0]}
        />
      </group>
    </>
  )
}

useGLTF.preload('/typing.glb')
useGLTF.preload('/sitting_and_talking.glb')
useGLTF.preload('/chair.glb')
