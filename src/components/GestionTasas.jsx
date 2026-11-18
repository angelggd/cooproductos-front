import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import  {Dialog}  from 'primereact/dialog';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { conteoTasas, getTasas, saveTasa, updateTasa } from '../services/srvCreditos';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdFirstPage, MdOutlineLastPage, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";


function GestionTasas(){
   const user = JSON.parse(localStorage.getItem("user"));
   const [tasas, setTasas] = useState([]);
   const [ventana, setVentana] = useState(false);
   const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});
   const [pagina, setPagina] = useState(1);
   const [selectedTasa, setSelectedTasa] = useState({id:0,tas_anual:0,tas_mes:0,tas_valor:0.00});


   const cargarTasas = async(query) => {
      const resul1 = await conteoTasas(user.token);
      if(resul1.status!==200) return;
      const datos = resul1.data;
      const treg = Number(datos.nregistros);
      const calc = Math.round(treg / 20);
      const xp = calc * 20 < treg ? calc + 1 : calc; 
      setPaginacion({totregistros: treg, totpaginas: xp});
      const resul2 = await getTasas(query, user.token);
      if(resul2.status!==200) {
        toast.error("Ocurrio un errr al cargar als tasas");
        return;
      }
      setTasas(resul2.data);
   };

   useEffect(() => {
      let query = {lim: 20, npag: 1};
      cargarTasas(query)
   }, []);

   const seleccionarTasa = (id) => {
      const registro = tasas.find(ele=>ele.id==id);
      setSelectedTasa(registro);
      setVentana(true);
   };

   const validacion = () => {
      if(selectedTasa.tas_anual<=2000) return {error:true, msg:"Valor del Año no valido"};
      if(selectedTasa.tas_mes<1) return {error:true, msg:"Valor del mes no valido"};
      if(selectedTasa.tas_valor<=0) return {error:true, msg:"Valor tasa no valido"};
      return {error:false, msg:"ok"};
   };

   const guardarDatos = async() => {
      const id = selectedTasa.id;
      const mes = selectedTasa.tas_mes;
      const anio = selectedTasa.tas_anual;
      const valida = validacion();
      if(valida.error) {
         toast.warning(valida.msg);
         return;
      };
      const existe = tasas.find(ele=>ele.tas_anual==anio && ele.tas_mes==mes);
      if(existe) {
         if(id==0) {
            toast.warning("Ya existe registro con el mismo periodo");
            return;
         };
         if(id>0 && existe.id!==id) {
            toast.warning("Ya existe registro con el mismo periodo");
            return;
         };
      };
      const datos = {tas_anual:anio, tas_mes:mes, tas_valor:selectedTasa.tas_valor};
      if(id==0) {
         const resul = await saveTasa(datos, user.token);
         if(resul.status!==200) return;
      } else {
         const resul = await updateTasa(datos, id, user.token);
         if(resul.status!==200) return;
      };
      toast.success("Registro actualizado");
      setVentana(false);
      const query = {lim:20, npag:pagina};
      await cargarTasas(query);
   };

   const abrirVentana = () => {
      const fecha = new Date();
      const anio = fecha.getFullYear();
      const mes = fecha.getMonth()+1;
      setSelectedTasa({id:0, tas_anual:anio, tas_mes:mes, tas_valor:0});
      setVentana(true)
   };

   const cambios = (e) => {
      const propiedad = e.target.name;
      const valor = e.target.value;
      setSelectedTasa({...selectedTasa, [propiedad]:valor})
   };

   const avanzaPagina = async() => {
      if(pagina==paginacion.totpaginas) return; 
      const n = Number(pagina) + 1;      
      setPagina(n);
      const query = {lim: 20, npag: n};
      await cargarTasas(query)
   };

   const retrocedePagina = async() => {
      if(pagina==1) return;
      const n = Number(pagina) - 1 ;       
      setPagina(n);
      const query = {lim: 20, npag: n};
      await cargarTasas(query)
   };   
   
   const primeraPagina = async() => {
      setPagina(1);
      const query = {lim: 20, npag: 1};
      await cargarTasas(query)
   };

   const ultimaPagina = async() => {
     const n = Number(paginacion.totpaginas);
     setPagina(n)
     const query = {lim: 20, npag: n};
     await cargarTasas(query)
   };


   return (
      <div className="bg-white p-6 rounded border border-gray-200">
         <div className="flex justify-between mb-2">
             <h3 className="text-lg font-bold text-primary ">Gestión de Tasas</h3>
             <MdOutlineCreateNewFolder size="24" className="text-yellow-400 hover:text-yellow-600 cursor-pointer" onClick={()=>abrirVentana(0)}/>
         </div>
         <p className="text-sm text-gray-600 mb-4">Registro y administración de tasa efectivas mensuales.</p>
         <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
            <table className="w-full text-left text-[16px] text-black">
               <thead>
                  <tr className="bg-gray-200">
                     <th>Año</th>
                     <th>Mes</th>
                     <th>Tasa</th>
                     <th>Editar</th>
                     <th>Borrar</th>                     
                  </tr>
               </thead> 
               <tbody>
                   {tasas.map(ele=>
                      <tr key={ele.id}>
                         <td><h1>{ele.tas_anual}</h1></td>
                         <td><h1>{ele.tas_mes}</h1></td>
                         <td><h1>{ele.tas_valor}</h1></td>
                         <td><FaEdit size="18" className="hover:text-blue-600" onClick={()=>seleccionarTasa(ele.id)}/></td>
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
              <div className="grid grid-cols-2 gap-2 text-[16px] mt-2">
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Id</h1> 
                  <h1 className="border-2 rounded-lg px-2">{selectedTasa.id}</h1>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Año</h1> 
                  <input type="number" 
                         name="tas_anual" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="Año" 
                         max={9999}
                         min={2000}
                         value={selectedTasa.tas_anual} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Mes</h1> 
                  <select name="tas_mes"
                          className="border-2 rounded-lg px-2" 
                          value={selectedTasa.tas_mes} 
                          onChange={(e)=>cambios(e)}>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Valor</h1> 
                  <input type="number" 
                         name="tas_valor" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="Valor" 
                         max={100}
                         min={0}
                         value={selectedTasa.tas_valor} 
                         onChange={(e)=>cambios(e)}/>
                  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-600" onClick={()=>guardarDatos()}>Guardar</button>
                  <button className="bg-gray-400 text-white rounded-lg hover:bg-gray-600" onClick={()=>setVentana(false)}>Cancelar</button>

              </div>
         </Dialog>     
      </div>
   )
};

export default GestionTasas;