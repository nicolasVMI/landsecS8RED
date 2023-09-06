import { Routes, Route } from "react-router-dom"

import routes from "./routes/routes"

function Content() {
   return (
      <Routes>
         {routes.map((route, idx) => {
            return (
               route.element && (
                  <Route
                     key={idx}
                     path={route.path}
                     element={<route.element/>}
                  />
               )
            )
         })}
      </Routes>
   )
}

export default Content
