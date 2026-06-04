import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export default function ScrollWatcher({ onScroll }) {
  const scroll = useScroll()

  useFrame(() => {
    onScroll(scroll.offset)
  })

  return null
}
