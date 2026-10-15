import { useState, useEffect } from "react";
import { getSolicitudes, countSolicitudes } from "../services/srvSolicitudes";
import { getClienteByTerceroId } from '../services/srvClientes';
import { toast } from "react-toastify";

function Solicitudes() {
   const user = JSON.parse(localStorage.getItem("user"));
   const [registros, setRegistros] = useState([]);
   const [npagina, setNpagina] = useState(1)
   const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});

   const cargarSolicitudes = async(query) => {
      if(user.roll_id==5) {  //roll de clientes normales
         const id = user.tercero_id;
         const resul0 = await getClienteByTerceroId(id, user.token);
         if(resul0.status!==200) {
            return;
         };
         const xquery = {...query, cliente:resul0.data.id};
         const resul1 = await countSolicitudes(xquery, user.token);
         if(resul1.status!==200) {
            return;
         };
         const datos = resul1.data;
         const treg = Number(datos.nregistros);
         const calc = Math.round(treg / 20);
         const xp = calc * 20 < treg ? calc + 1 : calc; 
         setPaginacion({totregistros: treg, totpaginas: xp});
         const resul2 = await getSolicitudes(xquery, user.token);
         if(resul2.status!==200) {
            return;
         };
         const datos2 = resul2.data;
         setRegistros(datos2);
         console.log(datos2);
      };
   };

   useEffect(() => {
      const query = { lim: 20, npag: npagina, estado:0, vendedor: 0, usuario_id:user.id, cliente:0 };
      cargarSolicitudes(query)
   }, []);

   return (
      <div className="bg-white p-6 rounded border border-gray-200">
          <h3 className="text-lg font-bold text-primary mb-2">Mis Solicitudes</h3>
          <p className="text-sm text-gray-600 mb-4">Listado general de radicaciones y créditos.</p>
                
          <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
              <table className="w-full text-left">
                 <thead className="bg-black text-white">
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Modelo</th>
                    <th>Solicitado</th>
                    <th>Valor Cuota</th>
                    <th>#Cuotas</th>
                    <th>Autorizado</th>
                    <th>Estado</th>
                 </thead>
                 <tbody>
                    {registros.map(ele=>
                       <tr>
                          <td>{ele.id}</td>
                          <td>{ele.sol_fechasolicitud}</td>
                          <td>{ele.cre_modelocredito.mod_nombre}</td>
                          <td>{ele.sol_valorsolicitado}</td>
                          <td>{ele.sol_valorcuota}</td>
                          <td>{ele.sol_numcuotas}</td>
                          <td>{ele.sol_valoraprobado}</td>
                          <td>{ele.sol_estado==0 ?"PENDIENTE" :"PROCESADO"}</td>
                       </tr>
                    )}
                 </tbody>
              </table>
          </div>
      </div>    
   )
};

export default Solicitudes;