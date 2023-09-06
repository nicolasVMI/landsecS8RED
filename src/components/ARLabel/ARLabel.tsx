import { useEffect, useRef } from "react"
import { a } from "@react-spring/three"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"

function ARLabel({
  rotation,
  path,
  distance,
  distanceFactor,
  altitude,
  image,
  opacity,
}) {
  const ref = useRef<THREE.Mesh>()
  const origin = new THREE.Vector3(0, 0, 0)
  const texture = useLoader(THREE.TextureLoader, path) as THREE.Texture
  const imageTexture =
    image && (useLoader(THREE.TextureLoader, image) as THREE.Texture)
  const alpha = useLoader(THREE.TextureLoader, "/images/sites/labels/alpha.png")
  alpha.magFilter = THREE.NearestFilter
  const z = (distance * distanceFactor + 100) * -1

  useEffect(() => {
    ref.current.lookAt(origin)
  }, [])

  return (
    <group rotation-y={rotation}>
      {image && (
        <mesh ref={ref} position={[0, altitude + 20, z]}>
          <planeGeometry args={[18.8, 18.8]} />
          <a.meshBasicMaterial
            map={imageTexture}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={opacity}
          />
        </mesh>
      )}
      <mesh ref={ref} position={[0, altitude, z]}>
        <planeGeometry args={[20, 20]} />
        <a.meshBasicMaterial
          map={texture}
          alphaMap={alpha}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={opacity}
        />
      </mesh>
      <mesh ref={ref} position={[0, altitude - 20, z]}>
        <planeGeometry args={[0.5, 20]} />
        <a.meshBasicMaterial
          color={"red"}
          transparent={true}
          opacity={opacity}
        />
      </mesh>
    </group>
  )
}

export default ARLabel
