import styled from "styled-components"
import { Routes, Route } from "react-router-dom"

import routes from "@routes/routes"

function TabletLayout() {
  return (
    <Content>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route key={idx} path={route.path} element={<route.element />} />
            )
          )
        })}
      </Routes>
    </Content>
  )
}

export default TabletLayout

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
