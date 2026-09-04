import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { VistaHome } from "./views/VistaHome"
import AuthView from "./views/AuthView"
import NotFoundView from "./views/NotFoundView"
import VistaSolicitud from "./views/VistaSolicitud";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<VistaHome/>} />
        <Route path="/auth" element={<AuthView/>} />

        <Route path="*" element={<NotFoundView />} />
        <Route path="/VistaSolicitud" element={<VistaSolicitud />} />
      </Routes>
      <ToastContainer
             position="top-right"
             autoClose={2000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss={false}
             draggable
             pauseOnHover
             theme="colored"
      />                           
    </BrowserRouter>    
  )
}

export default App
