import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdFirstPage, MdOutlineLastPage, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import  {Dialog}  from 'primereact/dialog';
import { getDptos, getCiudades, getTipodoc } from '../services/srvGenerales';
import { countUsers, getUsers, saveUser, updateUser, 
         toggleUser, getRolles, getUserById, cambiarClaveUser } from '../services/srvUsers'
import { saveTercero, updateTercero } from '../services/srvTerceros';

function GestionUsers() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [usuarios, setUsuarios] = useState([]);
    const [ventana, setVentana] = useState(false);
    const [ventanaClave, setVentanaClave] = useState(false);
    const [selectedUser, setSelectedUser] = useState({id:0, activo:1, tercero_id:0, dpto_id:0, ciudad_id:0, tipodoc:0, cliente_id:0, roll_id:0 });
    const [dptos, setDptos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [tipodocu, setTipodocu] = useState([]);
    const [rolles, setRolles] = useState([]);
    const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});
    const [pagina, setPagina] = useState(1);


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

    //carga de rolles
    const cargarRolles = async() => {
      const resul = await getRolles();
      if(!resul.status==200) return;
      setRolles(resul.data);
    };


    const blanquear = () => {
       setSelectedUser({
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
       cliente_id:0,
       activo:1,
       roll_id:0,
       clave1:"",
       clave2:"",
       })
    };

    //funcion que carga los usuarios
    const cargaUsuarios = async(query) => {
        const result1 = await countUsers(query);
        if(!result1.status==200) {
           toast.error("Ocurrio un error al ejecutar el conteo de los registros");
           return;
        }; 
        const datos = result1.data;
        const treg = Number(datos.nregistros);
        const calc = Math.round(treg / 20);
        const xp = calc * 20 < treg ? calc + 1 : calc; 
        setPaginacion({totregistros: treg, totpaginas: xp});

        const result2 = await getUsers(query);
        if(!result2.status==200) {
           toast.error("Error al cargar los registros");
           return;
        };
        setUsuarios(result2.data);
    };

    //abre ventana de dialogo para creacion o modificacion de un usuario
    const abrirVentana = (id) => {
       if(id==0) {
          blanquear();
       } else { //cargamos los datos del usuario seleccionado
 
       };
       setVentana(true);
    };

    useEffect(() => {
       cargarDptos(1);
       cargarTipodoc();
       cargarRolles();
       const query = {lim: 20, npag: 1, act:0, roll_id:0};
       cargaUsuarios(query);
    }, []);

    //cambiar de estado un usuario
    const  cambiaEstadoUser = async(id) => {
           const resul = await toggleUser(id);
           if(!resul.status==200) {
              toast.error("Ocurrio un error al actualizar estado del Usuario");
              return;
           };
           toast.success("Estado actualizado");
           let query = {lim: 20, npag: pagina, act:0};
           cargaUsuarios(query);
    };
   
    //ocurre cuando se selecciona un usuario para su edicion
    const seleccionarUsuario = async(id) => {
       const resul = await getUserById(id);
       if(!resul.status==200) return;
       const registro = resul.data;
       const dpt = registro.gnr_tercero.gnr_ciudad.departamento_id;
       setSelectedUser({
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
          roll_id:registro.roll_id,
          clave1:"",
          clave2:"",
       });
       cargarCiudades(dpt);
       abrirVentana(id);   
    };

    //se dispara cuando se modifica algun campo del usuario
    const cambios = (e) => {
       const propiedad = e.target.name;
       const valor = e.target.value;
       if(propiedad=="dpto_id") {
          setSelectedUser({...selectedUser, dpto_id:valor, ciudad_id:0});
          cargarCiudades(valor);
          return;
       };
       if(propiedad=="apellido1") {
             const raz = valor+" "+selectedUser.apellido2+" "+selectedUser.nombre1+" "+selectedUser.nombre2;
             setSelectedUser({...selectedUser, [propiedad]:valor, razon:raz});
             return;
       };
       if(propiedad=="apellido2") {
             const raz = selectedUser.apellido1+" "+valor+" "+selectedUser.nombre1+" "+selectedUser.nombre2;
             setSelectedUser({...selectedUser, [propiedad]:valor, razon:raz});
             return;
       };
       if(propiedad=="nombre1") {
             const raz = selectedUser.apellido1+" "+selectedUser.apellido2+" "+valor+" "+selectedUser.nombre2;
             setSelectedUser({...selectedUser, [propiedad]:valor, razon:raz});
             return;
       };
       if(propiedad=="nombre2") {
             const raz = selectedUser.apellido1+" "+selectedUser.apellido2+" "+selectedUser.nombre1+" "+valor;
             setSelectedUser({...selectedUser, [propiedad]:valor, razon:raz});
             return;
       };
 
       setSelectedUser({...selectedUser, [propiedad]:valor})
    };

    const avanzaPagina = async() => {
          if(pagina==paginacion.totpaginas) return; 
          const n = Number(pagina) + 1;      
          setPagina(n);
          const query = {lim: 20, npag: n, act:0};
          await cargaUsuarios(query)
   };
    
   const retrocedePagina = async() => {
          if(pagina==1) return;
          const n = Number(pagina) - 1 ;       
          setPagina(n);
          const query = {lim: 20, npag: n, act:0};
          await cargaUsuarios(query)
   };   
       
   const primeraPagina = async() => {
          setPagina(1);
          const query = {lim: 20, npag: 1, act:0};
          await cargaUsuarios(query)
   };
    
   const ultimaPagina = async() => {
         const n = Number(paginacion.totpaginas);
         setPagina(n)
         const query = {lim: 20, npag: n, act:0};
         await cargaUsuarios(query)
   };

   //cuando se da click en el boton cambiar clave
   const cambiarClave = () => {
      if(selectedUser.id==0) {
         toast.info("Usuario debe estar creado");
         return;
      };
      setVentana(false);
      setVentanaClave(true)
   };

   //validacion de informacion
   const validacion = () => {
       if(selectedUser.tipodoc==0) return {error:true, msg:"Debe seleccionar tipo de documento"};
       if(selectedUser.roll_id==0) return {error:true, msg:"Debe seleccionar el roll"};
       if(selectedUser.ciudad_id==0) return {error:true, msg:"Debe seleccionar ciudad"};
       if(selectedUser.documento.length<5) return {error:true, msg:"Numero de documento debe tener al menos 5 caracteres"};
       if(selectedUser.apellido1.length<3) return {error:true, msg:"Primer Apellido debe tener al menos 3 caracteres"};
       if(selectedUser.nombre1.length<3) return {error:true, msg:"Primer Nombre debe tener al menos 3 caracteres"};
       if(selectedUser.email.length<6) return {error:true, msg:"Email debe tener al menos 6 caracteres"};
       return {error:false, msg:""}
    };

    //actualizacion de informacion
    const guardarDatos = async() => {
       const valida = validacion();
       if(valida.error) {
          toast.warning(valida.msg);
          return;
       };
       let idtercero = selectedUser.tercero_id;
       const datosTercero = {
          ter_razon:selectedUser.razon,
          ter_apellido1:selectedUser.apellido1,
          ter_apellido2:selectedUser.apellido2,
          ter_nombre1:selectedUser.nombre1,
          ter_nombre2:selectedUser.nombre2,
          ter_documento:selectedUser.documento,
          ter_direccion:selectedUser.direccion,
          tipodoc_id:selectedUser.tipodoc,
          ciudad_id:selectedUser.ciudad_id,
          ter_telefono:selectedUser.telefono,
          ter_movil:selectedUser.celular,
          ter_email:selectedUser.email,
          tipopersona_id:selectedUser.tipodoc==8 ?1 :2,
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
          toast.success("Datos del usuario actualizados");
       };
       const datosUsuario = {
          id: selectedUser.id,
          tercero_id: idtercero,
          documento: selectedUser.documento,
          usu_activo: selectedUser.activo,
          roll_id: selectedUser.roll_id,
          usu_login: selectedUser.email,
       };
       if(selectedUser.id==0) {
          const resul3 = await saveUser(datosUsuario);
          if(!resul3.status==200) {
             toast.error("Ocurrio un error al actualizar usuario");
             return;
          };
       } else {
          const resul4 = await updateUser(datosUsuario, selectedUser.id);
          if(!resul4.status==200) {
             toast.error("Ocurrio un error al actualizar Usuario");
             return;
          };
       };   
       setVentana(false);
       toast.success("Registro actualizado");
       let query = {lim: 20, npag: pagina, act:0, roll_id:0};
       cargaUsuarios(query);
    };

    const cierraVentanaClave = () => {
       setVentanaClave(false);
       setVentana(true);
    };

    const actualizaClave = async() => {
       if(selectedUser.id == 0) {
          toast.warning("No ha seleccionado usuario");
          return;
       };
       if(selectedUser.clave1.length<4 && selectedUser.clave2.length<4) {
          toast.warning("La clave debe tener al menos 4 caracteres");
          return;
       };
       if(selectedUser.clave1!==selectedUser.clave2) {
          toast.warning("Las claves digitadas no coinciden");
       };
       const datos = {password:selectedUser.clave1};
       const resul = await cambiarClaveUser(datos, selectedUser.id);
       if(!resul.status==200) {
          toast.error("Ocurrio un error la intentar cambiar la clave");
          return;
       };
       toast.success("Clave actualizada");
       setVentanaClave(false);
       setVentana(true);
    };


    return (
       <div className="bg-white p-6 rounded border border-gray-200">
             <div className="flex justify-between mb-2">
                 <h3 className="text-lg font-bold text-primary ">Gestión de Usuarios</h3>
                <MdOutlineCreateNewFolder size="24" className="text-yellow-400 hover:text-yellow-600 cursor-pointer" onClick={()=>abrirVentana(0)}/>
             </div>
             <p className="text-sm text-gray-600 mb-4">Registro y administración de cuentas.</p>

             <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
                <table className="w-full text-left text-[12px] text-black">
                   <thead>
                      <tr className="bg-gray-200">
                         <th>Id</th>
                         <th>Razón social</th>
                         <th>Documento</th>
                         <th>Celular</th>
                         <th>Email</th>
                         <th>Roll</th>
                         <th>Activo</th>
                         <th>Editar</th>
                         <th>Borrar</th>
                      </tr>
                   </thead>
                   <tbody>
                      {usuarios.map(ele=>
                         <tr key={ele.id}>
                            <td>{ele.id}</td>
                            <td>{ele.gnr_tercero.ter_razon.slice(0,60)}</td>
                            <td>{ele.gnr_tercero.ter_documento}</td>
                            <td>{ele.gnr_tercero.ter_movil}</td>
                            <td>{ele.gnr_tercero.ter_email}</td>
                            <td>{ele.gnr_roll.roll_nombre}</td>
                            <td>
                               {ele.usu_activo==1 
                                    ? <FaToggleOn size="18" className="text-green-400 cursor-pointer hover:text-green-600" onClick={()=>cambiaEstadoUser(ele.id)}/> 
                                    : <FaToggleOff size="18" className="text-red-400 cursor-pointer hover:text-red-600" onClick={()=>cambiaEstadoUser(ele.id)}/>}
                            </td>
                            <td><FaEdit size="18" className="hover:text-blue-600" onClick={()=>seleccionarUsuario(ele.id)}/></td>
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
                           value={selectedUser.tipodoc} 
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
                          value={selectedUser.documento} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Razón social</h1>
                   <input type="text" 
                          name="razon" 
                          className="col-span-2 border-2 px-2 rounded-lg" 
                          placeholder="Razón social" 
                          maxLength={100}
                          value={selectedUser.razon} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Apellidos</h1>
                   <input type="text" 
                          name="apellido1" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="Primer Apellido" 
                          maxLength={30}
                          value={selectedUser.apellido1} 
                          onChange={(e)=>cambios(e)}/>
                   <input type="text" 
                          name="apellido2" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="Segundo Apellido" 
                          maxLength={30}
                          value={selectedUser.apellido2} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Nombres</h1>
                   <input type="text" 
                          name="nombre1" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="Primer Nombre" 
                          maxLength={30}
                          value={selectedUser.nombre1} 
                          onChange={(e)=>cambios(e)}/>
                   <input type="text" 
                          name="nombre2" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="Segundo Nombre" 
                          maxLength={30}
                          value={selectedUser.nombre2} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Roll</h1>
                   <select name="roll_id" 
                           className="col-span-2 border-2 rounded-lg px-2" 
                           value={selectedUser.roll_id} 
                           onChange={(e)=>cambios(e)}>
                      <option value="0">Seleccione Roll</option>
                      {rolles.map(rol=>
                         <option value={rol.id} key={rol.id}>{rol.roll_nombre}</option>
                      )}
                   </select> 

                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Dpto y Ciudad</h1>
                   <select name="dpto_id" 
                           className="border-2 rounded-lg px-2" 
                           value={selectedUser.dpto_id} 
                           onChange={(e)=>cambios(e)}>
                      <option value="0">Seleccione Departamento</option>
                      {dptos.map(dpt=>
                         <option value={dpt.id} key={dpt.id}>{dpt.dep_nombre}</option>
                      )}
                   </select> 
                   <select name="ciudad_id" 
                           className="border-2 rounded-lg px-2" 
                           value={selectedUser.ciudad_id} 
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
                          value={selectedUser.direccion} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Teléfono y celular</h1>
                   <input type="text" 
                          name="telefono" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="telefono" 
                          maxLength={12}
                          value={selectedUser.telefono} 
                          onChange={(e)=>cambios(e)}/>
                   <input type="text" 
                          name="celular" 
                          className="border-2 px-2 rounded-lg" 
                          placeholder="celular" 
                          maxLength={12}
                          value={selectedUser.celular} 
                          onChange={(e)=>cambios(e)}/>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Email</h1>
                   <input type="email" 
                          name="email" 
                          className="col-span-2 border-2 px-2 rounded-lg" 
                          placeholder="Digite email" 
                          maxLength={100}
                          value={selectedUser.email} 
                          onChange={(e)=>cambios(e)}/>
                   
                   <button className="bg-green-400 text-white rounded-lg hover:bg-green-600" onClick={()=>cambiarClave()}>Cambiar Clave</button>
                   <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-600" onClick={()=>guardarDatos()}>Guardar</button>
                   <button className="bg-gray-400 text-white rounded-lg hover:bg-gray-600" onClick={()=>setVentana(false)}>Cancelar</button>
                </div>
             </Dialog>

             {/* Ventana para cambio de clave */}
             <Dialog header="" 
                visible={ventanaClave} 
                className="w-full md:w-[50%] border-2 bg-gray-100 p-2 text-left text-[18px] rounded-lg text-black" 
                onHide={() => { if (!ventanaClave) return; setVentanaClave(false)}}>
                <h3 className="w-full text-center bg-blue-600 text-white">Actualizacion de Clave</h3>
                <div className="grid grid-cols-3 gap-2 mt-3">
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Usuario</h1>
                   <h1 className="col-span-2 bg-gray-200 rounded-lg text-center w-full border-gray-300">{selectedUser.razon}</h1>
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Nuevo Password</h1>
                   <input type="password" 
                          name="clave1" 
                          className="border-2 px-2 rounded-lg col-span-1" 
                          placeholder="Digite clave" 
                          maxLength={20}
                          value={selectedUser.clave1} 
                          onChange={(e)=>cambios(e)}/>
                   <h1>&nbsp;</h1>       
                   <h1 className=" bg-gray-200 rounded-lg text-center w-full border-gray-300">Nuevo Password</h1>
                   <input type="password" 
                          name="clave2" 
                          className="border-2 px-2 rounded-lg col-span-1" 
                          placeholder="Digite nuevamente la clave" 
                          maxLength={20}
                          value={selectedUser.clave2} 
                          onChange={(e)=>cambios(e)}/>
                   <h1>&nbsp;</h1>       
                   <h1>&nbsp;</h1> 
                   <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-600" onClick={()=>actualizaClave()}>Actualizar clave</button>
                   <button className="bg-gray-400 text-white rounded-lg hover:bg-gray-600" onClick={()=>cierraVentanaClave()}>Cancelar</button>

                </div>
             </Dialog>   
        </div>  
        )
};

export default GestionUsers;