import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import  {Dialog}  from 'primereact/dialog';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdFirstPage, MdOutlineLastPage, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { conteoPagadurias, getPagadurias, savePagaduria, togglePagaduria } from '../services/srvCreditos';
import { getDptos, getCiudades } from '../services/srvGenerales';
import { saveTercero, updateTercero } from '../services/srvTerceros';

function GestionPagadurias() {
   const user = JSON.parse(localStorage.getItem("user")); 
   const [empresas, setEmpresas] = useState([]);
   const [ventana, setVentana] = useState(false);
   const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});
   const [pagina, setPagina] = useState(1);
   const [selectedPag, setSelectedPag] = useState({id:0, pag_activa:0, tercero_id:0, dpto_id:0, ciudad_id:0});
   const [dptos, setDptos] = useState([]);
   const [ciudades, setCiudades] = useState([]);

   //cargue de dptos
   const cargarDptos = async(id) => {
         const resul = await getDptos(id, user.token);
         if(resul.status!==200) return;
         setDptos(resul.data);
         setCiudades([]);
   };
 
   //cargue de ciudades
   const cargarCiudades = async(id) => {
         const resul = await getCiudades(id, user.token);
         if(resul.status!==200) return;
         setCiudades(resul.data);
   };

   const cargarPagadurias = async(query) => {
         const resul1 = await conteoPagadurias(user.token);
         if(resul1.status!==200) return;
         const datos = resul1.data;
         const treg = Number(datos.nregistros);
         const calc = Math.round(treg / 20);
         const xp = calc * 20 < treg ? calc + 1 : calc; 
         setPaginacion({totregistros: treg, totpaginas: xp});
         const resul2 = await getPagadurias(query, user.token);
         if(resul2.status!==200) {
           toast.error("Ocurrio un error al cargar las pagadurias");
           return;
         }
         setEmpresas(resul2.data);
   };
  
   useEffect(() => {
      cargarDptos(1);
      let query = {pag:true, lim: 20, npag: 1, act:0};
      cargarPagadurias(query)
   }, []);

   const avanzaPagina = async() => {
      if(pagina==paginacion.totpaginas) return; 
      const n = Number(pagina) + 1;      
      setPagina(n);
      const query = {pag:true,lim: 20, npag: n, act:0};
      await cargarPagadurias(query)
   };

   const retrocedePagina = async() => {
      if(pagina==1) return;
      const n = Number(pagina) - 1 ;       
      setPagina(n);
      const query = {pag:true, lim: 20, npag: n, act:0};
      await cargarPagadurias(query)
   };   
   
   const primeraPagina = async() => {
      setPagina(1);
      const query = {pag:true, lim: 20, npag: 1, act:0};
      await cargarPagadurias(query)
   };

   const ultimaPagina = async() => {
     const n = Number(paginacion.totpaginas);
     setPagina(n)
     const query = {pag:true, lim: 20, npag: n, act:0};
     await cargarPagadurias(query)
   };

   //seleccion de pagaduria
   const seleccionaPag = (id) => {
      const reg = empresas.find(ele=>ele.id==id);
      const dpt = reg.gnr_tercero.gnr_ciudad.departamento_id;
      const registro = {
         id: reg.id,
         pag_activa: reg.pag_activa,
         tercero_id: reg.tercero_id,
         ter_documento: reg.gnr_tercero.ter_documento,
         ter_razon: reg.gnr_tercero.ter_razon,
         tipodoc_id: 8,
         tipopersona_id: 1,
         dpto_id: dpt,
         ciudad_id: reg.gnr_tercero.ciudad_id,
         ter_telefono: reg.gnr_tercero.ter_telefono,
         ter_movil: reg.gnr_tercero.ter_movil,
         ter_direccion: reg.gnr_tercero.ter_direccion,
         respfiscal_id: reg.gnr_tercero.respfiscal_id,
         ter_email: reg.gnr_tercero.ter_email,
      };
      cargarCiudades(dpt);
      setSelectedPag(registro);
      setVentana(true);
   };

   const cambios = (e) => {
      const propiedad = e.target.name;
      const valor = e.target.value;
      if(propiedad=="dpto_id") {
         const dpt = Number(valor);
         cargarCiudades(dpt);
      };
      setSelectedPag({...selectedPag, [propiedad]:valor})
   };

   //nuevo registro
   const nuevoRegistro = () => {
      const registro = {
         id: 0,
         pag_activa: 1,
         tercero_id: 0,
         ter_documento: "",
         ter_razon: "",
         tipodoc_id: 8,
         tipopersona_id: 1,
         dpto_id: 0,
         ciudad_id: 0,
         ter_telefono: "",
         ter_movil: "",
         ter_direccion: "",
         respfiscal_id: 5,
         ter_email: "",
      };
      setSelectedPag(registro);
      setCiudades([]);
      setVentana(true);
   };

   //validacion
   const validacion = () => {
      if(selectedPag.ciudad_id==0) return {error:true, msg:"No ha seleccionado la ciudad"};
      if(selectedPag.ter_razon.length<6) return {error:true, msg:"Razon social debe tener al menos 6 caracteres"};
      if(selectedPag.ter_documento.length<4) return {error:true, msg:"Numero de documento debe tener al menos 4 caracteres"};
      return {error:false, msg:""} 
   };

   //actualizacion registro
   const guardarDatos = async() => {
      const valida = validacion();
      if(valida.error) {
          toast.warning(valida.msg);
          return;
      };
      let idtercero = selectedPag.tercero_id;
      const terdatos = {
         ter_documento: selectedPag.ter_documento,
         ter_razon: selectedPag.ter_razon,
         tipodoc_id: 8,
         tipopersona_id: 1,
         ciudad_id: selectedPag.ciudad_id,
         ter_telefono: selectedPag.ter_telefono,
         ter_movil: selectedPag.ter_movil,
         ter_direccion: selectedPag.ter_direccion,
         respfiscal_id: selectedPag.respfiscal_id,
         ter_email: selectedPag.ter_email,
      };
      if(idtercero==0) {
          //creamos el tercero
          const resul1 = await saveTercero(terdatos, user.token);
          if(!resul1.status==200) {
             toast.error("Ocurrio un error al actualizar el tercero");
             return;
          };
          const tercero = resul1.data.registro;
          idtercero = tercero.id;
       } else {
          //actualizamos el tercero
          const resul2 = await updateTercero(terdatos, idtercero, user.token);
          if(!resul2.status==200) {
             toast.error("Ocurrio un error al actualizar el tercero");
             return;
          };
          toast.success("Datos de la pagaduria actualizados");
       };
       const datos = {tercero_id:idtercero, pag_activa:selectedPag.pag_activa};
       if(selectedPag.id==0) {
          const resul3 = await savePagaduria(datos, user.token);
          if(!resul3.status==200) {
             toast.error("Ocurrio un error al actualizar pagaduria");
          };
       };
       setVentana(false);
       let query = {pag:true, lim: 20, npag: pagina, act:0};
       cargarPagadurias(query);
   };

   //funcion que cambia estadod e pagaduria
   const cambiaEstado = async(id) => {
      const resul = await togglePagaduria(id, user.token);
      if(resul.status!==200) {
         toast.error("Ocurrio un error al actualizar estado pagaduria");
         return;
      };
      toast.success("Estado actualizado");
      let query = {pag:true, lim: 20, npag: pagina, act:0};
      cargarPagadurias(query);
   };


   return (
     <div className="bg-white p-6 rounded border border-gray-200">
         <div className="flex justify-between mb-2">
             <h3 className="text-lg font-bold text-primary ">Gestión de Pagadurias</h3>
             <MdOutlineCreateNewFolder size="24" className="text-yellow-400 hover:text-yellow-600 cursor-pointer" onClick={()=>nuevoRegistro()}/>
         </div>
         <p className="text-sm text-gray-600 mb-4">Registro y administración de pagadurias.</p>
         <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
            <table className="w-full text-left text-[12px] text-black">
               <thead>
                  <tr className="bg-gray-200">
                     <th>Entidad</th>
                     <th>Nit</th>
                     <th>Activa</th>
                     <th>Editar</th>
                     <th>Borrar</th>                     
                  </tr>
               </thead> 
               <tbody>
                   {empresas.map(ele=>
                      <tr key={ele.id}>
                         <td>{ele.gnr_tercero.ter_razon}</td>
                         <td>{ele.gnr_tercero.ter_documento}</td>
                         <td>
                              {ele.pag_activa==1 
                                    ? <FaToggleOn size="18" className="text-green-400 cursor-pointer hover:text-green-600" onClick={()=>cambiaEstado(ele.id)}/> 
                                    : <FaToggleOff size="18" className="text-red-400 cursor-pointer hover:text-red-600" onClick={()=>cambiaEstado(ele.id)}/>}
                         </td>
                         <td><FaEdit size="18" className="hover:text-blue-600" onClick={()=>seleccionaPag(ele.id)}/></td>
                         <td><RiDeleteBin2Fill size="18" className="hover:text-red-600"/></td>
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
         {/* Ventana para modificar informacion de un registro */}
         <Dialog header="" 
              visible={ventana} 
              className="w-full md:w-[50%] border-2 bg-gray-100 p-2 text-left text-[18px] rounded-lg text-black" 
              onHide={() => { if (!ventana) return; setVentana(false)}}>
              <h3 className="w-full text-center bg-blue-600 text-white">Actualizacion de registro</h3>
              <div className="grid grid-cols-3 gap-2 text-[14px] mt-2">
                  <h1 className="bg-gray-200 rounded-lg text-center w-full border-gray-300">Id</h1>
                  <h1 className="col-span-1 border-2 rounded-lg text-center w-full border-gray-300">{selectedPag.id}</h1>
                  <h1>&nbsp;</h1>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Documento</h1>
                  <input type="text" 
                          name="ter_documento" 
                          className="col-span-2 border-2 px-2 rounded-lg" 
                          placeholder="No. Documento" 
                          maxLength={12}
                          value={selectedPag.ter_documento} 
                          onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Razón Social</h1>
                  <input type="text" 
                          name="ter_razon" 
                          className="col-span-2 border-2 px-2 rounded-lg" 
                          placeholder="Razon social" 
                          maxLength={100}
                          value={selectedPag.ter_razon} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Dpto y Ciudad</h1>
                   <select name="dpto_id" 
                           className="border-2 rounded-lg px-2" 
                           value={selectedPag.dpto_id} 
                           onChange={(e)=>cambios(e)}>
                      <option value="0">Seleccione Departamento</option>
                      {dptos.map(dpt=>
                         <option value={dpt.id} key={dpt.id}>{dpt.dep_nombre}</option>
                      )}
                   </select> 
                   <select name="ciudad_id" 
                           className="border-2 rounded-lg px-2" 
                           value={selectedPag.ciudad_id} 
                           onChange={(e)=>cambios(e)}>
                      <option value="0">Seleccione Ciudad</option>
                      {ciudades.map(ciu=>
                         <option value={ciu.id} key={ciu.id}>{ciu.ciu_nombre}</option>
                      )}
                   </select> 
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Dirección</h1>
                   <input type="text" 
                          name="ter_direccion" 
                          className="col-span-2 border-2 px-2 rounded-lg" 
                          placeholder="Dirección" 
                          maxLength={60}
                          value={selectedPag.ter_direccion} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Teléfono y celular</h1>
                   <input type="text" 
                          name="ter_telefono" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="telefono" 
                          maxLength={12}
                          value={selectedPag.ter_telefono} 
                          onChange={(e)=>cambios(e)}/>
                   <input type="text" 
                          name="ter_movil" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="celular" 
                          maxLength={12}
                          value={selectedPag.ter_movil} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Email</h1>
                   <input type="email" 
                          name="ter_email" 
                          className="col-span-2 border-2 px-2 rounded-lg" 
                          placeholder="Digite email" 
                          maxLength={100}
                          value={selectedPag.ter_email} 
                          onChange={(e)=>cambios(e)}/>

                  <h1>&nbsp;</h1>
                  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-600 p-2" onClick={()=>guardarDatos()}>Guardar</button>
                  <button className="bg-gray-400 text-white rounded-lg hover:bg-gray-600 p-2" onClick={()=>setVentana(false)}>Cancelar</button>
              </div>
         </Dialog>     
      </div>
   )
}

export default GestionPagadurias;