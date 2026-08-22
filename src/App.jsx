import { BrowserRouter, Routes, Route } from "react-router-dom"
import { VistaHome } from "./views/VistaHome"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<VistaHome/>} />
      </Routes>
    </BrowserRouter>    
  )
}

export default App
