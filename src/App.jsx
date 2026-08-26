import { BrowserRouter, Routes, Route } from "react-router-dom"
import { VistaHome } from "./views/VistaHome"
import AuthView from "./views/AuthView"
import NotFoundView from "./views/NotFoundView"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<VistaHome/>} />
        <Route path="/auth" element={<AuthView/>} />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>    
  )
}

export default App
