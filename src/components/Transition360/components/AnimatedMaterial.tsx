import { forwardRef, useMemo, useEffect } from "react"
import * as THREE from "three"

const Vertex = `
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vUv = uv;
}
`

const Fragment = `
uniform sampler2D uInitialTexture;
uniform sampler2D uFinalTexture;
uniform float uBlend;

varying vec2 vUv;

void main() {
  
  vec4 currentColor = texture2D(uInitialTexture, vUv);
  vec4 nextColor = texture2D(uFinalTexture, vUv);
  vec4 finalColor = mix(currentColor, nextColor, uBlend);

  gl_FragColor = finalColor;
}
`

const AnimatedMaterial = forwardRef(function AnimatedMaterial(
   //@ts-ignore
   { initialTexture, finalTexture, blend },
   ref
) {
   const uniforms = useMemo(
      () => ({
         uBlend: { value: blend },
         uInitialTexture: { value: initialTexture },
         uFinalTexture: { value: finalTexture }
      }),
      []
   )

   // useEffect(() => {
   //    console.log(uniforms)
   // }, [])
   return (
      <shaderMaterial
      //@ts-ignore
         ref={ref}
         vertexShader={Vertex}
         fragmentShader={Fragment}
         side={THREE.DoubleSide}
         uniforms={uniforms}
      />
   )
})

export default AnimatedMaterial
