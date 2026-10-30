import { useState, useEffect } from "react";
import { IoDocumentTextOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { ImCheckboxChecked } from "react-icons/im";
import { HiUsers } from "react-icons/hi2";
import { FaFileSignature } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { infoSolicitudes } from '../services/srvSolicitudes';
import GraficoBarras from "./GraficoBarras";

function Estadisticas() {
     const [solicitudes, setSolicitudes] = useState({activas:0, aprobadas:0, rechazadas:0});

     //traemos la informacion de las solicitudes del mes activo
     const infoMes = async() => {
        const fecha = new Date();
        const mes = fecha.getMonth()+1;
        const anual = fecha.getFullYear();

        const resul = await infoSolicitudes({anual, mes});
        if(resul.status!==200) return;
        const datos = resul.data;
        const apro = datos.filter(ele=>ele.sol_estado==3);
        const rech = datos.filter(ele2=>ele2.sol_estado==4);
        const ndatos = datos.length;
        const napro = apro.length;
        const nrech = rech.length;
        setSolicitudes({activas:ndatos, aprobadas:napro, rechazadas:nrech})
     };

     useEffect(() => {
        infoMes();
     }, []);


     return (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex">
                        <IoDocumentTextOutline size="32" className="w-[20%] h-auto bg-green-100 p1 rounded-lg border-2 border-green-200"/>
                        <div className="w-[80%] ml-3">
                           <span className="text-xs text-gray-500 font-bold uppercase">Solicitudes del Mes</span>
                           <p className="text-2xl font-bold text-primary mt-1">{solicitudes.activas}</p>
                        </div>
                    </div>             
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                   <div className="flex">
                        <ImCheckboxChecked size="32" className="w-[20%] h-auto bg-green-100 p-3 rounded-lg border-2 border-green-200"/>
                        <div className="w-[80%] ml-3">
                           <span className="text-xs text-gray-500 font-bold uppercase">Aprobaciones del Mes</span>
                           <p className="text-2xl font-bold text-primary mt-1">{solicitudes.aprobadas}</p>
                        </div>
                    </div>   
                  </div>
             
                  <div className="bg-white p-4 rounded border border-gray-200">
                   <div className="flex">
                        <HiUsers size="32" className="w-[20%] h-auto bg-green-100 p-3 rounded-lg border-2 border-green-200"/>
                        <div className="w-[80%] ml-3">
                           <span className="text-xs text-gray-500 font-bold uppercase">Rechazos del Mes</span>
                           <p className="text-2xl font-bold text-primary mt-1">{solicitudes.rechazadas}</p>
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
 
           </div>
   )
};

export default Estadisticas;