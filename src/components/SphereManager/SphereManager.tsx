import { Fragment, useEffect } from "react"
import { useSpring } from "@react-spring/core"
import { a } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

import { useStore } from "@state/store"
import config from "../../config"

function SphereManager() {
  const socket = useStore((s) => s.socket)
  const currentTour = useStore((s) => s.currentTour)
  const setCurrentTour = useStore((s) => s.setCurrentTour)

  const textures = [
    {
      texture: "/textures/landsec/bridge_plaza.webp",
      rotation: [0, -3.5, 0],
    },
    {
      texture: "/textures/landsec/bridge.webp",
      rotation: [0, 3.2, 0],
    },
    {
      texture: "/textures/landsec/liberty.webp",
      rotation: [0, 1.25, 0],
    },
    {
      texture: "/textures/landsec/lion_court.webp",
      rotation: [0, 1.53, 0],
    },
    {
      texture: "/textures/landsec/lion_river.webp",
      rotation: [0, 0, 0],
    },
    {
      texture: "/textures/landsec/lion_terrace.webp",
      rotation: [0, -2.0, 0],
    },
    {
      texture: "/textures/landsec/timber_int.webp",
      rotation: [0, -0.3, 0],
    },
    {
      texture: "/textures/landsec/timber.webp",
      rotation: [0, 0.9, 0],
    },
  ].map((obj) => {
    return {
      texture: useLoader(THREE.TextureLoader, obj.texture) as THREE.Texture,
      rotation: obj.rotation,
    }
  })

  textures.forEach((obj) => {
    obj.texture.minFilter = THREE.LinearFilter
    obj.texture.wrapS = THREE.RepeatWrapping
    obj.texture.repeat.x = -1
  })

  const getSprings = () => {
    let obj = {}
    for (let i = 0; i < textures.length; i++) {
      obj[i] = useSpring({
        opacity: i === currentTour ? 1 : 0,
      })
    }
    return obj
  }
  const springs = getSprings()

  useEffect(() => {
    socket &&
      socket.on("receive-test", (data) => {
        if (data.type === "texture") {
          setCurrentTour(data.count)
          return
        }
      })
  }, [socket])

  useEffect(() => {
    socket &&
      socket.emit("test", {
        type: "update",
        value: {
          type: "tour",
          user: config.user,
          value: currentTour
        }
      })
  }, [currentTour])

  return (
    <Fragment>
      {textures.map((obj, i) => {
        return (
          <mesh
            key={i}
            position={[0, 0, 0]}
            //@ts-ignore
            rotation={obj.rotation}
            visible={currentTour === i}
          >
            <sphereGeometry args={[500, 60, 40]} />
            {/* @ts-ignore */}
            <a.meshBasicMaterial
              toneMapped={false}
              map={obj.texture}
              side={THREE.DoubleSide}
              transparent
              opacity={springs[i].opacity}
            />
          </mesh>
        )
      })}
    </Fragment>
  )
}

export default SphereManager
