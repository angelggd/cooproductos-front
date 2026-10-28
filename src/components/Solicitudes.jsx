import { useState, useEffect } from "react";
import { getSolicitudes, countSolicitudes, getSolicitudById, getSeguimiento} from "../services/srvSolicitudes";
import { getClienteByTerceroId } from '../services/srvClientes';
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdFirstPage, MdOutlineLastPage, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import  {Dialog}  from 'primereact/dialog';

function Solicitudes() {
   const user = JSON.parse(localStorage.getItem("user"));
   const [registros, setRegistros] = useState([]);
   const [pagina, setPagina] = useState(1);
   const [ventana, setVentana] = useState(false);
   const [ventanaSeg, setVentanaSeg] = useState(false);
   const [iestado, setIestado] = useState(9);
   const [historico, setHistorico] = useState([]);
   const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});
   const [solicitud, setSolicitud] = useState({
      id:0,
      cre_cliente: {gnr_tercero:{}},
      cre_modelocredito: {},
      cre_vendedor: {gnr_tercero: {}},
      gnr_usuario: {gnr_tercero: {}},
      sol_inversion: 0,
      sol_valorcuota: 0,
      sol_numcuotas: 0,
      sol_valorsolicitado: 0,
      sol_totcredito: 0,
   });

   //carga de solicitudes paginadas segun el fitro
   const cargarSolicitudes = async(query) => {
         const resul1 = await countSolicitudes(query, user.token);
         if(resul1.status!==200) {
            return;
         };
         const datos = resul1.data;
         const treg = Number(datos.nregistros);
         const calc = Math.round(treg / 20);
         const xp = calc * 20 < treg ? calc + 1 : calc; 
         setPaginacion({totregistros: treg, totpaginas: xp});
         const resul2 = await getSolicitudes(query, user.token);
         if(resul2.status!==200) {
            return;
         };
         const datos2 = resul2.data;
         setRegistros(datos2);
   };

   useEffect(() => {
      const query = {lim: 20, npag: pagina, estado:iestado, usuario_id:user.id, roll_id:user.roll_id, tercero_id:user.tercero_id, vendedor_id:0, cliente_id:0};
      cargarSolicitudes(query)
   }, []);

   //se ejecuta cuando se filtra por un estado diferente
   const cambiaEstado = async(e) => {
      const id = Number(e.target.value);
      setIestado(id);
      const query = {lim: 20, npag: pagina, estado:id, usuario_id:user.id, roll_id:user.roll_id, tercero_id:user.tercero_id, vendedor_id:0, cliente_id:0};
      cargarSolicitudes(query)
   };

   //ocurre cuando seleccionamos una solicitud para su seguimiento
   const seleccionarSolicitud = async(id) => {
      const resul = await getSolicitudById(id);
      if(resul.status!==200) {
         toast.error("Ocurrio un error al cargar la solicitud");
         return;
      };
      const datos = resul.data;
      const tcredito = Number(datos.sol_valorcuota) * Number(datos.sol_numcuotas);
      setSolicitud({...datos, sol_totcredito:tcredito});
      setVentana(true)
   };

   const avanzaPagina = async() => {
      if(pagina==paginacion.totpaginas) return; 
      const n = Number(pagina) + 1;      
      setPagina(n);
      const query = {lim: 20, npag: n, estado:iestado, usuario_id:user.id, roll_id:user.roll_id, tercero_id:user.tercero_id, vendedor_id:0, cliente_id:0};
      await cargarSolicitudes(query)
   };

   const retrocedePagina = async() => {
      if(pagina==1) return;
      const n = Number(pagina) - 1 ;       
      setPagina(n);
      const query = {lim: 20, npag: n, estado:iestado, usuario_id:user.id, roll_id:user.roll_id, tercero_id:user.tercero_id, vendedor_id:0, cliente_id:0};
      await cargarSolicitudes(query)
   };   
   
   const primeraPagina = async() => {
      setPagina(1);
      const query = {lim: 20, npag: 1, estado:iestado, usuario_id:user.id, roll_id:user.roll_id, tercero_id:user.tercero_id, vendedor_id:0, cliente_id:0};
      await cargarSolicitudes(query)
   };

   const ultimaPagina = async() => {
     const n = Number(paginacion.totpaginas);
     setPagina(n)
      const query = {lim: 20, npag: n, estado:iestado, usuario_id:user.id, roll_id:user.roll_id, tercero_id:user.tercero_id, vendedor_id:0, cliente_id:0};
     await cargarSolicitudes(query)
   };

   //carga de seguimiento de ordenes
   const cargaSeguimientos = async() => {
      const id = solicitud.id;
      const resul = await getSeguimiento(id);
      if(resul.status!==200) {
         toast.error("Ocurrio un error al cargar los seguimientos de la solicitud")
         return;
      };
      setHistorico(resul.data);
      setVentana(false);
      setVentanaSeg(true);
   };

   const cierraSeg = () => {
      setVentanaSeg(false);
      setVentana(true);
   };


   return (
      <div className="bg-white p-6 rounded border border-gray-200">
          <h3 className="text-lg font-bold text-primary mb-2">Mis Solicitudes</h3>
          <div className="flex mb-4">
             <p className="w-[70%] text-sm text-gray-600 ">Listado general de radicaciones y créditos.</p>
             <div className="grid grid-cols-2 gap-1 w-[30%] text-[14px]">
                <h1 className="bg-gray-300 rounded-lg text-center">Estado</h1>
                <select name="estado" className="border-2 px-2 rounded-lg" onChange={(e)=>cambiaEstado(e)} value={iestado}>
                   <option value="9">**TODAS**</option>
                   <option value="0">Pendientes</option>
                   <option value="1">En revisión</option>
                   <option value="2">En validación</option>
                   <option value="3">Aprobadas</option>
                   <option value="4">Rechazadas</option>
                   <option value="5">Anuladas</option>
                </select>
             </div>
          </div>
                
          <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
              <table className="w-full text-left">
                 <thead className="bg-black text-white">
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Modelo</th>
                    <th>Solicitado</th>
                    <th>Valor Cuota</th>
                    <th>#Cuotas</th>
                    <th>Autorizado</th>
                    <th>Estado</th>
                    <th>Edit</th>
                 </thead>
                 <tbody>
                    {registros.map(ele=>
                       <tr key={ele.id}>
                          <td>{ele.cre_cliente.cli_razonsocial}</td>
                          <td>{ele.sol_fechasolicitud}</td>
                          <td>{ele.cre_modelocredito.mod_nombre}</td>
                          <td>{ele.sol_valorsolicitado}</td>
                          <td>{ele.sol_valorcuota}</td>
                          <td>{ele.sol_numcuotas}</td>
                          <td>{ele.sol_valoraprobado}</td>
                          <td>{ele.sol_estado==0 ?"PENDIENTE" 
                              : ele.sol_estado==1 ? "EN REVISION"  
                              : ele.sol_estado==2 ? "EN VALIDACION"
                              : ele.sol_estado==3 ? "APROBADA"
                              : ele.sol_estado==4 ? "RECHAZADA" :"ANULADA"
                           }</td>
                          <td><FaEdit size="18" className="text-green-400 cursor-pointer hover:text-green-600" onClick={()=>seleccionarSolicitud(ele.id)}/></td>
                       </tr>
                    )}
                 </tbody>
              </table>
              {/*paginacion */}
              <div className="flex w-full mt-4 justify-center">
                  <button className="bg-blue-400 py-2 px-4 text-center text-white rounded-lg hover:bg-blue-600" onClick={()=>primeraPagina()}><MdFirstPage size="24"/></button> 
                  <button className="bg-blue-400 py-2 px-4 text-center text-white rounded-lg hover:bg-blue-600 ml-4" onClick={()=>retrocedePagina()}><GrFormPrevious size="24"/></button> 
                  <h1 className="ml-4 mt-2">Pagina {pagina}</h1>
                  <button className="bg-blue-400 py-2 px-4 text-center text-white rounded-lg hover:bg-blue-600 ml-4" onClick={()=>avanzaPagina()}><MdOutlineNavigateNext size="24"/></button> 
                  <button className="bg-blue-400 py-2 px-4 text-center text-white rounded-lg hover:bg-blue-600 ml-4" onClick={()=>ultimaPagina()}><MdOutlineLastPage size="24"/></button> 
              </div>
          </div>
          {/* Ventana para actualizacion de datos */}
          <Dialog header="" 
               visible={ventana} 
               className="w-[50%]  border-2 bg-gray-100 p-2 text-left text-[18px] rounded-lg text-black" 
               onHide={() => { if (!ventana) return; setVentana(false)}}>
               <h3 className="w-full text-center">Actualizacion Registro</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-6 mt-2 text-[14px]">
                  <h1 className="bg-blue-200 rounded-lg text-center">Número</h1>
                  <h1 className="border-2 rounded-lg text-center col-span-1 px-2 w-[30%]">{solicitud.id}</h1>
                  <h1>&nbsp;</h1>

                  <h1 className="bg-blue-200 rounded-lg text-center">Cliente</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2">{solicitud.cre_cliente.gnr_tercero.ter_razon}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Documento</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2">{solicitud.cre_cliente.gnr_tercero.ter_documento}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Pagaduría</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2">{solicitud.sol_empresa}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Línea de Crédito</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2">{solicitud.cre_modelocredito.mod_nombre}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Gestor Comercial</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2">{solicitud.cre_vendedor.gnr_tercero.ter_razon}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Fecha de Solicitud</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2 w-[20%]">{solicitud.sol_fechasolicitud}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Monto Solicitado</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2 w-[30%]">${solicitud.sol_valorsolicitado.toLocaleString('es-CO')}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Valor Cuota</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2 w-[30%]">${solicitud.sol_valorcuota.toLocaleString('es-CO')}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Numero de Cuotas</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2 w-[10%]">{solicitud.sol_numcuotas}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Total Crédito</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2 w-[30%]">${solicitud.sol_totcredito.toLocaleString('es-CO')}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Valor Inversión</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2 w-[30%]">${solicitud.sol_inversion.toLocaleString('es-CO')}</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Estado Solicitud</h1>
                  <h1 className="border-2 rounded-lg px-2 bg-yellow-200 font-bold">{solicitud.sol_estado==0 ?"PENDIENTE" 
                              : solicitud.sol_estado==1 ? "EN REVISION"  
                              : solicitud.sol_estado==2 ? "EN VALIDACION"
                              : solicitud.sol_estado==3 ? "APROBADA"
                              : solicitud.sol_estado==4 ? "RECHAZADA" :"ANULADA"}</h1>
                  <h1>&nbsp;</h1>
                  <h1>&nbsp;</h1>
                  <button className="bg-green-400 p-2 rounded-lg text-white cursor-pointer hover:bg-green-600" onClick={()=>cargaSeguimientos()}>Seguimiento</button>
                  <button className="bg-gray-400 p-2 rounded-lg text-white cursor-pointer hover:bg-gray-600" onClick={()=>setVentana(false)}>Cerrar</button>

               </div>
          </Dialog>  
          {/* Ventana para actualizacion de datos */}
          <Dialog header="" 
               visible={ventanaSeg} 
               className="w-[55%]  border-2 bg-gray-100 p-2 text-left text-[18px] rounded-lg text-black" 
               onHide={() => { if (!ventanaSeg) return; setVentanaSeg(false)}}>
               <h3 className="w-full text-center">Seguimiento Solicitud</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-6 mt-2 text-[14px]">
                  <h1 className="bg-blue-200 rounded-lg text-center">Número</h1>
                  <h1 className="border-2 rounded-lg text-center col-span-1 px-2 w-[30%]">{solicitud.id}</h1>
                  <h1>&nbsp;</h1>
                  <h1 className="bg-blue-200 rounded-lg text-center">Cliente</h1>
                  <h1 className="border-2 rounded-lg col-span-2 px-2">{solicitud.cre_cliente.gnr_tercero.ter_razon}</h1>
               </div> 
               <div className="p-6 mt-2 border-2 border-accent">  
               <table className="w-full text-left text-[12px]">
                  <thead>
                     <tr className="bg-gray-300">
                        <th>Etapa</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Observaciones</th>
                        <th>Edit</th>
                     </tr>
                  </thead>
                  <tbody>
                     {historico.map(his=>
                        <tr>
                           <td>{his.seg_etapa==1 ? "Solicitud" 
                              : his.seg_etapa==2 ? "Revision"
                              : his.seg_etapa==3 ? "Validación Identidad"
                              : his.seg_etapa==4 ? "Documentación"
                              : his.seg_etapa==5 ? "Aprobación" : "Rechazo"}
                           </td>
                           <td>{his.seg_fecha}</td>
                           <td>{his.gnr_usuario.gnr_tercero.ter_razon.slice(0,40)}</td>
                           <td>{his.seg_observacion.slice(0,64)}</td>
                           <td><FaEdit size="18"/></td>
                        </tr>
                     )}
                  </tbody>
               </table>
               </div>
               <div className="grid grid-cols-3 gap-1 mt-4 text-[14px]">
                   <h1 className="bg-blue-300 rounded-lg text-center">Etapa</h1>
                   <select name="etapa" className="col-span-2 border-2 px-2">
                     <option value="0">Seleccione Etapa</option>
                     <option value="2">Revisión</option>
                     <option value="3">Validación Identidad</option>
                     <option value="4">Revision documentacion</option>
                     <option value="5">Aprobacion</option>
                     <option value="6">Rechazo</option>
                     <option value="7">Anulación</option>
                   </select>
                   <h1 className="bg-blue-300 rounded-lg text-center">Observaciones</h1>
                   <textarea name="observa" className="col-span-2 border-2 rounded-lg px-2" rows={3}>
                   
                   </textarea>
                   <h1>&nbsp;</h1>
                   <button className="bg-green-400 text-white text-center rounded-lg p-2">Guardar Item</button>
                   <button className="bg-gray-400 text-white text-center rounded-lg p-2 " onClick={()=>cierraSeg()}>Cerrar</button>
               </div>
          </Dialog>
      </div>    
   )
};

export default Solicitudes;