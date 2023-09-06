import React from "react"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"

function Scene({ children }) {

   return (
      <Wrapper>
         {children}
      </Wrapper>
   )
}

export default Scene

const Wrapper = styled(Canvas)`
   width: 100%;
   height: 100%;
`
