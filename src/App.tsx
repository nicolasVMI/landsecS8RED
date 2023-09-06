import { BrowserRouter, Routes, Route } from "react-router-dom"

import DefaultLayout from "./DefaultLayout"

import { useStore } from "@state/store"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App