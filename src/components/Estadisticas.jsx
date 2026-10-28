import { IoDocumentTextOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { ImCheckboxChecked } from "react-icons/im";
import { HiUsers } from "react-icons/hi2";
import { FaFileSignature } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

function Estadisticas() {
     return (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex">
                        <IoDocumentTextOutline size="32" className="w-[20%] h-auto bg-green-100 p1 rounded-lg border-2 border-green-200"/>
                        <div className="w-[80%] ml-3">
                           <span className="text-xs text-gray-500 font-bold uppercase">Solicitudes Activas</span>
                           <p className="text-2xl font-bold text-primary mt-1">5</p>
                        </div>
                    </div>             
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                   <div className="flex">
                        <ImCheckboxChecked size="32" className="w-[20%] h-auto bg-green-100 p-3 rounded-lg border-2 border-green-200"/>
                        <div className="w-[80%] ml-3">
                           <span className="text-xs text-gray-500 font-bold uppercase">Aprobaciones</span>
                           <p className="text-2xl font-bold text-primary mt-1">12</p>
                        </div>
                    </div>   
                  </div>
             
                  <div className="bg-white p-4 rounded border border-gray-200">
                   <div className="flex">
                        <HiUsers size="32" className="w-[20%] h-auto bg-green-100 p-3 rounded-lg border-2 border-green-200"/>
                        <div className="w-[80%] ml-3">
                           <span className="text-xs text-gray-500 font-bold uppercase">Asociados Nuevos</span>
                           <p className="text-2xl font-bold text-primary mt-1">18</p>
                        </div>
                    </div>   
                  </div>
              </div>

              <div className="bg-green-50 w-full rounded-lg flex border-2 border-green-200 mt-4 p-4">
                  <div className="w-[15%] flex bg-green-100 p-2 rounded-lg">
                     <IoShieldCheckmarkOutline size="32"/>
                     <FaFileSignature size="32" className="ml-2"/>
                  </div>
                  <div className="w-[60%] ml-10">
                     <h1 className="text-2xl">Validación y Firma Digital</h1>
                     <h1 className="text-[10px]">Validación de identidad, consulta de antecedentes y firma de documentos</h1>
                  </div>
                  <div className="w-[25%]">
                    <button className="bg-green-800 text-white rounded-lg py-2 px-4 flex">
                      <h1 className="text-[14px] mt-1">Ir a ZapSign</h1>
                      <MdExitToApp size="32" className="ml-3"/>
                    </button>
                  </div>
              </div>
              <h1 className="text-xl mt-2">Accesos rápidos</h1>
              <div className="grid grid-cols-2 gap-5 mt-2">
                 <div className="bg-white text-green-900 flex p-4 rounded-lg">
                    <div>
                       <h1>Mis Solicitudes</h1>
                       <h1 className="text-[10px]">Consulta y dá seguimiento a tus solicitudes</h1>
                    </div>
                 </div>
                 <div className="bg-white text-green-900 flex p-4 rounded-lg">
                   <div>
                       <h1>Simulador de créditos</h1>
                       <h1 className="text-[10px]">Calcula el valor de la cuota antes de iniciar la solicitud</h1>
                    </div>
                 </div>
                 <div className="bg-white text-green-900 flex p-4 rounded-lg">
                    <div>
                       <h1>Gestión de clientes</h1>
                       <h1 className="text-[10px]">Consulta y administra la información de clientes</h1>
                    </div>
                 </div>
                 <div className="bg-white text-green-900 flex p-4 rounded-lg">
                    <div>
                       <h1>Gestión de usuarios</h1>
                       <h1 className="text-[10px]">Administra los accesos del equipo</h1>
                    </div>
                 </div>

              </div>
           </div>
   )
};

export default Estadisticas;