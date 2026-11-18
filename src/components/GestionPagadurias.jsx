import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import  {Dialog}  from 'primereact/dialog';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdFirstPage, MdOutlineLastPage, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";

function GestionPagadurias() {
   const user = JSON.parse(localStorage.getItem("user")); 
   const [empresas, setEmpresas] = useState([]);
   const [ventana, setVentana] = useState(false);
   const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});
   const [pagina, setPagina] = useState(1);

   const cargarPagadurias = async(query) => {
         return;
         const resul1 = await conteoEmp(user.token);
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
      let query = {lim: 20, npag: 1};
      //cargarPagadurias(query)
   }, []);

      const avanzaPagina = async() => {
      if(pagina==paginacion.totpaginas) return; 
      const n = Number(pagina) + 1;      
      setPagina(n);
      const query = {lim: 20, npag: n};
      await cargarPagadurias(query)
   };

   const retrocedePagina = async() => {
      if(pagina==1) return;
      const n = Number(pagina) - 1 ;       
      setPagina(n);
      const query = {lim: 20, npag: n};
      await cargarPagadurias(query)
   };   
   
   const primeraPagina = async() => {
      setPagina(1);
      const query = {lim: 20, npag: 1};
      await cargarPagadurias(query)
   };

   const ultimaPagina = async() => {
     const n = Number(paginacion.totpaginas);
     setPagina(n)
     const query = {lim: 20, npag: n};
     await cargarPagadurias(query)
   };

   return (
     <div className="bg-white p-6 rounded border border-gray-200">
         <div className="flex justify-between mb-2">
             <h3 className="text-lg font-bold text-primary ">Gestión de Pagadurias</h3>
             <MdOutlineCreateNewFolder size="24" className="text-yellow-400 hover:text-yellow-600 cursor-pointer" onClick={()=>abrirVentana(0)}/>
         </div>
         <p className="text-sm text-gray-600 mb-4">Registro y administración de pagadurias.</p>
         <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
            <table className="w-full text-left text-[12px] text-black">
               <thead>
                  <tr className="bg-gray-200">
                     <th>Entidad</th>
                     <th>Nit</th>
                     <th>Código</th>
                     <th>Activa</th>
                     <th>Editar</th>
                     <th>Borrar</th>                     
                  </tr>
               </thead> 
               <tbody>
                   {empresas.map(ele=>
                      <tr key={ele.id}>
                         <td><h1></h1></td>
                         <td><h1></h1></td>
                         <td><h1></h1></td>
                         <td><h1></h1></td>
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
                  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-600" onClick={()=>guardarDatos()}>Guardar</button>
                  <button className="bg-gray-400 text-white rounded-lg hover:bg-gray-600" onClick={()=>setVentana(false)}>Cancelar</button>
              </div>
         </Dialog>     
      </div>
   )
}

export default GestionPagadurias;