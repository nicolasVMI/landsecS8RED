import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"

import { useStore } from "@state/store"

function Sphere({ texture, initialRotation }) {
  const meshRef = useRef<THREE.Mesh>()
  const mainTexture = useLoader(THREE.TextureLoader, texture) as THREE.Texture
  mainTexture.minFilter = THREE.LinearFilter
  mainTexture.wrapS = THREE.RepeatWrapping
  mainTexture.repeat.x = -1

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={initialRotation}
      ref={meshRef}
    >
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        toneMapped={false}
        map={mainTexture}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

export default Sphere
