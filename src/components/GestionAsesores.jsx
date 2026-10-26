import { useState, useEffect } from "react";
import { getAsesores, saveAsesor, getAsesorById, toggleAsesor } from '../services/srvAsesores';
import { toast } from "react-toastify";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import  {Dialog}  from 'primereact/dialog';
import { getDptos, getCiudades, getTipodoc } from '../services/srvGenerales';
import { saveTercero, updateTercero } from '../services/srvTerceros';

function GestionAsesores() {
   const user = JSON.parse(localStorage.getItem("user"));
   const [asesores, SetAsesores] = useState([]);
   const [ventana, setVentana] = useState(false);
   const [selectedAsesor, setSelectedAsesor] = useState({id:0, activo:1, tercero_id:0, dpto_id:0, ciudad_id:0, tipodoc:0 });
   const [dptos, setDptos] = useState([]);
   const [ciudades, setCiudades] = useState([]);
   const [tipodocu, setTipodocu] = useState([]);

   //cargue de dptos
   const cargarDptos = async(id) => {
        const resul = await getDptos(id);
        if(resul.status!==200) return;
        setDptos(resul.data);
        setCiudades([]);
   };

   //cargue de ciudades
   const cargarCiudades = async(id) => {
        const resul = await getCiudades(id);
        setCiudades(resul.data);
   };

   //cargar tipo de documento
   const cargarTipodoc = async() => {
        const resul = await getTipodoc();
        if(resul.status!==200) return;
        setTipodocu(resul.data);
   };


   const blanquear = () => {
      setSelectedAsesor({
      id:0,
      razon:"",
      apellido1:"",
      apellido2:"",
      nombre1:"",
      nombre2:"",
      tipodoc:0,
      documento:"",
      dpto_id:0,
      ciudad_id:0,
      direccion:"",
      telefono:"",
      celular:"",
      email:"",
      tercero_id: 0,
      activo:1,
      })
   };

   //carga de asesores
   const cargaAsesores = async() => {
      const resul = await getAsesores({act:0});
      if(resul.status!==200) {
          toast.error("Ocurrio un error al consultar asesores");
          return;
      };
      const datos = resul.data;
      SetAsesores(datos);
   };

   useEffect(() => {
      cargarDptos(1);
      cargarTipodoc();
      cargaAsesores();
   }, []);

  
   //ocurre cuando se selecciona un asesor para su edicion
   const seleccionarAsesor = async(id) => {
      const resul = await getAsesorById(id);
      if(!resul.status==200) return;
      const registro = resul.data;
      const dpt = registro.gnr_tercero.gnr_ciudad.departamento_id;
      setSelectedAsesor({
         id:registro.id,
         razon:registro.gnr_tercero.ter_razon,
         apellido1:registro.gnr_tercero.ter_apellido1,
         apellido2:registro.gnr_tercero.ter_apellido2,
         nombre1:registro.gnr_tercero.ter_nombre1,
         nombre2:registro.gnr_tercero.ter_nombre2,
         tipodoc:registro.gnr_tercero.tipodoc_id,
         documento:registro.gnr_tercero.ter_documento,
         dpto_id:dpt,
         ciudad_id:registro.gnr_tercero.ciudad_id,
         direccion:registro.gnr_tercero.ter_direccion,
         telefono:registro.gnr_tercero.ter_telefono,
         celular:registro.gnr_tercero.ter_movil,
         email:registro.gnr_tercero.ter_email,
         tercero_id: registro.tercero_id,
         activo:registro.out_activo,
      });
      cargarCiudades(dpt);
      abrirVentana();   
   };

   //se dispara cuando se modifica algun campo del asesor
   const cambios = (e) => {
      const propiedad = e.target.name;
      const valor = e.target.value;
      if(propiedad=="dpto_id") {
         setSelectedAsesor({...selectedAsesor, dpto_id:valor, ciudad_id:0});
         cargarCiudades(valor);
         return;
      };
      if(propiedad=="apellido1") {
            const raz = valor+" "+selectedAsesor.apellido2+" "+selectedAsesor.nombre1+" "+selectedAsesor.nombre2;
            setSelectedAsesor({...selectedAsesor, [propiedad]:valor, razon:raz});
            return;
      };
      if(propiedad=="apellido2") {
            const raz = selectedAsesor.apellido1+" "+valor+" "+selectedAsesor.nombre1+" "+selectedAsesor.nombre2;
            setSelectedAsesor({...selectedAsesor, [propiedad]:valor, razon:raz});
            return;
      };
      if(propiedad=="nombre1") {
            const raz = selectedAsesor.apellido1+" "+selectedAsesor.apellido2+" "+valor+" "+selectedAsesor.nombre2;
            setSelectedAsesor({...selectedAsesor, [propiedad]:valor, razon:raz});
            return;
      };
      if(propiedad=="nombre2") {
            const raz = selectedAsesor.apellido1+" "+selectedAsesor.apellido2+" "+selectedAsesor.nombre1+" "+valor;
            setSelectedAsesor({...selectedAsesor, [propiedad]:valor, razon:raz});
            return;
      };

      setSelectedAsesor({...selectedAsesor, [propiedad]:valor})
   };

   //cambiar de estado un asesor
   const  cambiaEstadoAsesor = async(id) => {
      const resul = await toggleAsesor(id);
      if(!resul.status==200) {
         toast.error("Ocurrio un error al actualizar estado del asesor");
         return;
      };
      toast.success("Estado actualizado")
      cargaAsesores();
   };

   //abre ventana de dialogo para creacion o modificacion de un asesor
   const abrirVentana = (id) => {
      if(id==0) {
         blanquear();
      } else { //cargamos los datos del asesor seleccionado

      };
      setVentana(true);
   };

   //validacion de informacion
   const validacion = () => {
      if(selectedAsesor.tipodoc==0) return {error:true, msg:"Debe seleccionar tipo de documento"};
      if(selectedAsesor.ciudad_id==0) return {error:true, msg:"Debe seleccionar ciudad"};
      if(selectedAsesor.documento.length<5) return {error:true, msg:"Numero de documento debe tener al menos 5 caracteres"};
      if(selectedAsesor.apellido1.length<3) return {error:true, msg:"Primer Apellido debe tener al menos 3 caracteres"};
      if(selectedAsesor.nombre1.length<3) return {error:true, msg:"Primer Nombre debe tener al menos 3 caracteres"};
      if(selectedAsesor.email.length<6) return {error:true, msg:"Email debe tener al menos 6 caracteres"};
      return {error:false, msg:""}
   };

   //actualizacion de informacion
   const guardarDatos = async() => {
      const valida = validacion();
      if(valida.error) {
         toast.warning(valida.msg);
         return;
      };
      let idtercero = selectedAsesor.tercero_id;
      const datosTercero = {
         ter_razon:selectedAsesor.razon,
         ter_apellido1:selectedAsesor.apellido1,
         ter_apellido2:selectedAsesor.apellido2,
         ter_nombre1:selectedAsesor.nombre1,
         ter_nombre2:selectedAsesor.nombre2,
         ter_documento:selectedAsesor.documento,
         ter_direccion:selectedAsesor.direccion,
         tipodoc_id:selectedAsesor.tipodoc,
         ciudad_id:selectedAsesor.ciudad_id,
         ter_telefono:selectedAsesor.telefono,
         ter_movil:selectedAsesor.celular,
         ter_email:selectedAsesor.email,
         tipopersona_id:selectedAsesor.tipodoc==8 ?1 :2,
         respfiscal_id:1,
      };
      if(idtercero==0) {
         //creamos el tercero
         const resul1 = await saveTercero(datosTercero);
         if(!resul1.status==200) {
            toast.error("Ocurrio un error al actualizar el tercero");
            return;
         };
         const tercero = resul1.data.registro;
         idtercero = tercero.id;
      } else {
         //actualizamos el tercero
         const resul2 = await updateTercero(datosTercero, idtercero);
         if(!resul2.status==200) {
            toast.error("Ocurrio un error al actualizar el tercero");
            return;
         };
         toast.success("Datos del asesor actualizados");
      };
      const datosAsesor = {
         id: selectedAsesor.id,
         tercero_id: idtercero,
         out_activo: selectedAsesor.activo,
      };
      if(selectedAsesor.id==0) {
         const resul3 = await saveAsesor(datosAsesor);
         if(!resul3.status==200) {
            toast.error("Ocurrio un error al actualizar asesor");
            return;
         };
      };   
      setVentana(false);
      toast.success("Registro actualizado")
      cargaAsesores();
   };

   return (
       <div className="bg-white p-6 rounded border border-gray-200">
            <div className="flex justify-between mb-2">
            <h3 className="text-lg font-bold text-primary ">Gestión de Asesores</h3>
            <MdOutlineCreateNewFolder size="24" className="text-yellow-400 hover:text-yellow-600 cursor-pointer" onClick={()=>abrirVentana(0)}/>
            </div>
            <p className="text-sm text-gray-600 mb-4">Registro y administración de asesores outsorcing.</p>

            <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
               <table className="w-full text-left text-[12px] text-black">
                  <thead>
                     <tr className="bg-gray-200">
                        <th>Id</th>
                        <th>Asesor</th>
                        <th>Documento</th>
                        <th>Celular</th>
                        <th>Email</th>
                        <th>Activo</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                     </tr>
                  </thead>
                  <tbody>
                     {asesores.map(ele=>
                        <tr key={ele.id}>
                           <td>{ele.id}</td>
                           <td>{ele.gnr_tercero.ter_razon.slice(0,60)}</td>
                           <td>{ele.gnr_tercero.ter_documento}</td>
                           <td>{ele.gnr_tercero.ter_movil}</td>
                           <td>{ele.gnr_tercero.ter_email}</td>
                           <td>
                              {ele.out_activo==1 
                                   ? <FaToggleOn size="18" className="text-green-400 cursor-pointer hover:text-green-600" onClick={()=>cambiaEstadoAsesor(ele.id)}/> 
                                   : <FaToggleOff size="18" className="text-red-400 cursor-pointer hover:text-red-600" onClick={()=>cambiaEstadoAsesor(ele.id)}/>}
                           </td>
                           <td><FaEdit size="18" className="hover:text-blue-600" onClick={()=>seleccionarAsesor(ele.id)}/></td>
                           <td><RiDeleteBin2Fill size="18" className="hover:text-red-600"/></td>
                        </tr>  
                     )}
                  </tbody>
               </table>
            </div>

            {/* Ventana para actualizacion de datos */}
            <Dialog header="" 
               visible={ventana} 
               className="w-full md:w-[50%] border-2 bg-gray-100 p-2 text-left text-[18px] rounded-lg text-black" 
               onHide={() => { if (!ventana) return; setVentana(false)}}>
               <h3 className="w-full text-center">Actualizacion Registro</h3>
               <div className="grid grid-cols-3 gap-1 text-[16px]">
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Documento</h1>
                  <select name="tipodoc"
                          className="border-2 rounded-lg px-2" 
                          value={selectedAsesor.tipodoc} 
                          onChange={(e)=>cambios(e)}>
                     <option value="0">Seleccione Tipo documento</option>
                     {tipodocu.map(tdoc=>
                        <option value={tdoc.id} key={tdoc.id}>{tdoc.tdoc_nombre}</option>
                     )}
                  </select> 
                  <input type="text" 
                         name="documento" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="No. Documento" 
                         maxLength={12}
                         value={selectedAsesor.documento} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Razón social</h1>
                  <input type="text" 
                         name="razon" 
                         className="col-span-2 border-2 px-2 rounded-lg" 
                         placeholder="Razón social" 
                         maxLength={100}
                         value={selectedAsesor.razon} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Apellidos</h1>
                  <input type="text" 
                         name="apellido1" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="Primer Apellido" 
                         maxLength={30}
                         value={selectedAsesor.apellido1} 
                         onChange={(e)=>cambios(e)}/>
                  <input type="text" 
                         name="apellido2" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="Segundo Apellido" 
                         maxLength={30}
                         value={selectedAsesor.apellido2} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Nombres</h1>
                  <input type="text" 
                         name="nombre1" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="Primer Nombre" 
                         maxLength={30}
                         value={selectedAsesor.nombre1} 
                         onChange={(e)=>cambios(e)}/>
                  <input type="text" 
                         name="nombre2" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="Segundo Nombre" 
                         maxLength={30}
                         value={selectedAsesor.nombre2} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Dpto y Ciudad</h1>
                  <select name="dpto_id" 
                          className="border-2 rounded-lg px-2" 
                          value={selectedAsesor.dpto_id} 
                          onChange={(e)=>cambios(e)}>
                     <option value="0">Seleccione Departamento</option>
                     {dptos.map(dpt=>
                        <option value={dpt.id} key={dpt.id}>{dpt.dep_nombre}</option>
                     )}
                  </select> 
                  <select name="ciudad_id" 
                          className="border-2 rounded-lg px-2" 
                          value={selectedAsesor.ciudad_id} 
                          onChange={(e)=>cambios(e)}>
                     <option value="0">Seleccione Ciudad</option>
                     {ciudades.map(ciu=>
                        <option value={ciu.id} key={ciu.id}>{ciu.ciu_nombre}</option>
                     )}
                  </select> 
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Dirección</h1>
                  <input type="text" 
                         name="direccion" 
                         className="col-span-2 border-2 px-2 rounded-lg" 
                         placeholder="Dirección" 
                         maxLength={60}
                         value={selectedAsesor.direccion} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Teléfono y celular</h1>
                  <input type="text" 
                         name="telefono" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="telefono" 
                         maxLength={12}
                         value={selectedAsesor.telefono} 
                         onChange={(e)=>cambios(e)}/>
                  <input type="text" 
                         name="celular" 
                         className="border-2 px-2 rounded-lg" 
                         placeholder="celular" 
                         maxLength={12}
                         value={selectedAsesor.celular} 
                         onChange={(e)=>cambios(e)}/>
                  <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Email</h1>
                  <input type="email" 
                         name="email" 
                         className="col-span-2 border-2 px-2 rounded-lg" 
                         placeholder="Digite email" 
                         maxLength={100}
                         value={selectedAsesor.email} 
                         onChange={(e)=>cambios(e)}/>
                  <h1>&nbsp;</h1>
                  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-600" onClick={()=>guardarDatos()}>Guardar</button>
                  <button className="bg-gray-400 text-white rounded-lg hover:bg-gray-600" onClick={()=>setVentana(false)}>Cancelar</button>
               </div>
            </Dialog>
       </div>
   )
};

export default GestionAsesores;