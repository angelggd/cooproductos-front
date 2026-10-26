import { useState, useEffect } from "react";
import { countClientes, getClientes, getClienteById, saveCliente, updateCliente } from '../services/srvClientes';
import { toast } from "react-toastify";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdFirstPage, MdOutlineLastPage, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import  {Dialog}  from 'primereact/dialog';
import { saveTercero, updateTercero } from '../services/srvTerceros';
import { getPaises, getDptos, getCiudades, getTipodoc,
         getEstcivil, getNivEducativo, getOcupaciones, getVivienda } from '../services/srvGenerales';
import { getPagadurias } from '../services/srvCreditos';


function GestionClientes() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [clientes, setClientes] = useState([]);
    const [ventana, setVentana] = useState(false);
    const [paises, setPaises] = useState([]);
    const [dptos, setDptos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [tipodocu, setTipodocu] = useState([]);
    const [paginacion, setPaginacion] = useState({totregistros: 0, totpaginas: 0});
    const [pagina, setPagina] = useState(1);
    const [vivienda, setVivienda] = useState([]);
    const [estcivil, setEstCivil] = useState([]);
    const [ocupacion, setOcupacion] = useState([]);
    const [niveducativo, setNivEducativo] = useState([]);
    const [ciudadesres, setCiudadesRes] = useState([]);
    const [ciulab, setCiulab] = useState([]);
    const [pagadurias, setPagadurias] = useState([]);
    const [dptosres, setDptosRes] = useState([]);
    const [dptoslab, setDptosLab] = useState([]);
    const [cliente, setCliente] = useState({
        id: 0,
        tercero_id: 0,
        ter_razon: "",
        tipodoc_id: 0,
        ter_apellido1: "",
        ter_apellido2: "",
        ter_nombre1: "",
        ter_nombre2: "",
        ter_documento: "",
        pais_id: 0,
        dpto_id: 0,
        ciudad_id: 0,
        sexo: 0,
        ter_email: "",
        ter_direccion : "",
        ter_telefono: "",
        ter_celular: "",
        respfiscal_id: 1,
        fechanac: "",
        dptores_id:0,
        ciures_id:0,
        dptolab_id:0,
        ciulab_id:0,
        ocupacion_id:0,
        niveducativo_id:0,
        vivienda_id: 0,
        sexo:0,
        personasacargo:0,
        estcivil_id:0,
        empresa:"",
        empresa_id:0,
        cargo:"",
        fechaing:"",
        sueldo:0,
        dirempresa:"",
        telempresa:"",
    });

 
    //cargue de paises
    const cargarPaises = async() => {
        const resul = await getPaises();
        if(resul.status!==200) return;
        setPaises(resul.data);
        setDptos([]);
        setCiudades([]);
    };

    //cargue de dptos
    const cargarDptos = async(id, x) => {
        const resul = await getDptos(id);
        if(resul.status!==200) return;
        if(x==1) {
           setDptos(resul.data);
           setCiudades([]);
        };
        if(x==2) {
           setDptosRes(resul.data);
           setCiudadesRes([]);
        };
        if(x==3) {
            setDptosLab(resul.data);
            setCiulab([]);
        }
    };

    //cargue de ciudades
    const cargarCiudades = async(id, x) => {
        const resul = await getCiudades(id);
        if(x==1) setCiudades(resul.data);
        if(x==2) setCiudadesRes(resul.data);
        if(x==3) setCiulab(resul.data);
    };
 
    //cargar tipo de documento
    const cargarTipodoc = async() => {
         const resul = await getTipodoc();
         if(resul.status!==200) return;
         setTipodocu(resul.data);
    };
 
    //cargue de pagadurias
    const cargarPagadurias = async() => {
        const resul = await getPagadurias({act:1});
        if(resul.status!==200) return;
        setPagadurias(resul.data);
    };

   //cargue de viviendas
    const cargarViviendas = async() => {
        const resul = await getVivienda();
        if(resul.status!==200) return;
        setVivienda(resul.data)
    };

    //cargar ocupaciones
    const cargarOcupacion = async() => {
        const resul = await getOcupaciones();
        if(resul.status!==200) return;
        setOcupacion(resul.data);
    };

    //cargar nivel educativo
    const cargarNivelEdu = async() => {
        const resul = await getNivEducativo();
        if(resul.status!==200) return;
        setNivEducativo(resul.data);
    };

    //cargar estados civiles
    const cargarEstCivil = async() => {
        const resul = await getEstcivil();
        if(resul.status!==200) return;
        setEstCivil(resul.data)
    };

    const blanquear = () => {
       setCliente({
        id: 0,
        tercero_id: 0,
        ter_razon: "",
        tipodoc_id: 0,
        ter_apellido1: "",
        ter_apellido2: "",
        ter_nombre1: "",
        ter_nombre2: "",
        ter_documento: "",
        pais_id: 0,
        dpto_id: 0,
        ciudad_id: 0,
        sexo: 0,
        ter_email: "",
        ter_direccion : "",
        ter_telefono: "",
        ter_celular: "",
        respfiscal_id: 1,
        fechanac: "",
        dptores_id:0,
        ciures_id:0,
        dptolab_id:0,
        ciulab_id:0,
        ocupacion_id:0,
        niveducativo_id:0,
        vivienda_id: 0,
        sexo:0,
        personasacargo:0,
        estcivil_id:0,
        empresa:"",
        empresa_id:0,
        cargo:"",
        fechaing:"",
        sueldo:0,
        dirempresa:"",
        telempresa:"",
       })
    };
 
    //carga de clientes
    const cargaClientes = async(query) => {
        const result1 = await countClientes(query);
        if(!result1.status==200) {
           toast.error("Ocurrio un error al ejecutar el conteo de los registros");
           return;
        }; 
        const datos = result1.data;
        const treg = Number(datos.nregistros);
        const calc = Math.round(treg / 20);
        const xp = calc * 20 < treg ? calc + 1 : calc; 
        setPaginacion({totregistros: treg, totpaginas: xp});
        const result2 = await getClientes(query);
        if(!result2.status==200) {
           toast.error("Error al cargar los registros");
           return;
        };
        setClientes(result2.data);
    };
 
    useEffect(() => {
       cargarPaises();
       cargarDptos(1, 2)
       cargarDptos(1, 3)        
       cargarTipodoc();
       cargarPagadurias();
       cargarEstCivil();
       cargarOcupacion();
       cargarNivelEdu();
       cargarViviendas();
       let query = {lim: 20, npag: 1, act:0};
       cargaClientes(query);
    }, []);
 
   
    //ocurre cuando se selecciona un Cliente para su edicion
    const seleccionarCliente = async(id) => {
       const resul = await getClienteById(id);
       if(!resul.status==200) return;
       const registro = resul.data;
       const dpt = registro.gnr_tercero.gnr_ciudad.departamento_id;
       setCliente({
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
 
    //se dispara cuando se modifica algun campo del cliente
    const cambios = (e) => {
       const propiedad = e.target.name;
       const valor = e.target.value;
       if(propiedad=="dpto_id") {
          setcliente({...cliente, dpto_id:valor, ciudad_id:0});
          cargarCiudades(valor);
          return;
       };
       if(propiedad=="apellido1") {
             const raz = valor+" "+cliente.apellido2+" "+cliente.nombre1+" "+cliente.nombre2;
             setcliente({...cliente, [propiedad]:valor, razon:raz});
             return;
       };
       if(propiedad=="apellido2") {
             const raz = cliente.apellido1+" "+valor+" "+cliente.nombre1+" "+cliente.nombre2;
             setcliente({...cliente, [propiedad]:valor, razon:raz});
             return;
       };
       if(propiedad=="nombre1") {
             const raz = cliente.apellido1+" "+cliente.apellido2+" "+valor+" "+cliente.nombre2;
             setcliente({...cliente, [propiedad]:valor, razon:raz});
             return;
       };
       if(propiedad=="nombre2") {
             const raz = cliente.apellido1+" "+cliente.apellido2+" "+cliente.nombre1+" "+valor;
             setcliente({...cliente, [propiedad]:valor, razon:raz});
             return;
       };
 
       setcliente({...cliente, [propiedad]:valor})
    };
 
    //cambiar de estado un cliente
    const  cambiaEstadoCliente = async(id) => {
       const resul = await toggleCliente(id);
       if(!resul.status==200) {
          toast.error("Ocurrio un error al actualizar estado del Cliente");
          return;
       };
       toast.success("Estado actualizado");
       let query = {lim: 20, npag: pagina, act:0};
       cargaclientes(query);
    };
 
    //abre ventana de dialogo para creacion o modificacion de un cliente
    const abrirVentana = (id) => {
       if(id==0) {
          blanquear();
       } else { //cargamos los datos del cliente seleccionado
 
       };
       setVentana(true);
    };
 
    //validacion de informacion
    const validacion = () => {
       if(cliente.tipodoc==0) return {error:true, msg:"Debe seleccionar tipo de documento"};
       if(cliente.ciudad_id==0) return {error:true, msg:"Debe seleccionar ciudad"};
       if(cliente.documento.length<5) return {error:true, msg:"Numero de documento debe tener al menos 5 caracteres"};
       if(cliente.apellido1.length<3) return {error:true, msg:"Primer Apellido debe tener al menos 3 caracteres"};
       if(cliente.nombre1.length<3) return {error:true, msg:"Primer Nombre debe tener al menos 3 caracteres"};
       if(cliente.email.length<6) return {error:true, msg:"Email debe tener al menos 6 caracteres"};
       return {error:false, msg:""}
    };
 
    //actualizacion de informacion
    const guardarDatos = async() => {
       const valida = validacion();
       if(valida.error) {
          toast.warning(valida.msg);
          return;
       };
       let idtercero = cliente.tercero_id;
       const datosTercero = {
          ter_razon:cliente.razon,
          ter_apellido1:cliente.apellido1,
          ter_apellido2:cliente.apellido2,
          ter_nombre1:cliente.nombre1,
          ter_nombre2:cliente.nombre2,
          ter_documento:cliente.documento,
          ter_direccion:cliente.direccion,
          tipodoc_id:cliente.tipodoc,
          ciudad_id:cliente.ciudad_id,
          ter_telefono:cliente.telefono,
          ter_movil:cliente.celular,
          ter_email:cliente.email,
          tipopersona_id:cliente.tipodoc==8 ?1 :2,
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
          toast.success("Datos del tercero actualizados");
       };
       const datosCliente = {
          id: cliente.id,
          tercero_id: idtercero,
          cli_activo: cliente.activo,
       };
       if(cliente.id==0) {
          const resul3 = await saveCliente(datosCliente);
          if(!resul3.status==200) {
             toast.error("Ocurrio un error al actualizar Cliente");
             return;
          };
       } else {
          const resul4 = await updateCliente(datosCliente, cliente.id);
          if(!resul4.status==200) {
             toast.error("Ocurrio un error al actualizar Cliente");
             return;
          };
       };   
       setVentana(false);
       toast.success("Registro actualizado");
       let query = {lim: 20, npag: pagina, act:0, out:0};
       cargaClientes(query);
    };

    const avanzaPagina = async() => {
      if(pagina==paginacion.totpaginas) return; 
      const n = Number(pagina) + 1;      
      setPagina(n);
      const query = {lim: 20, npag: n, act:0, out:0};
      await cargaClientes(query)
   };

   const retrocedePagina = async() => {
      if(pagina==1) return;
      const n = Number(pagina) - 1 ;       
      setPagina(n);
      const query = {lim: 20, npag: n, act:0, out:0};
      await cargaClientes(query)
   };   
   
   const primeraPagina = async() => {
      setPagina(1);
      const query = {lim: 20, npag: 1, act:0, out:0};
      await cargaClientes(query)
   };

   const ultimaPagina = async() => {
     const n = Number(paginacion.totpaginas);
     setPagina(n)
     const query = {lim: 20, npag: n, act:0, out:0};
     await cargaClientes(query)
   };

 
    return (
        <div className="bg-white p-6 rounded border border-gray-200">
             <div className="flex justify-between mb-2">
             <h3 className="text-lg font-bold text-primary ">Gestión de clientes</h3>
             <MdOutlineCreateNewFolder size="24" className="text-yellow-400 hover:text-yellow-600 cursor-pointer" onClick={()=>abrirVentana(0)}/>
             </div>
             <p className="text-sm text-gray-600 mb-4">Registro y administración de clientes.</p>
             <div className="p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
                <table className="w-full text-left text-[12px] text-black">
                   <thead>
                      <tr className="bg-gray-200">
                         <th>Id</th>
                         <th>Cliente</th>
                         <th>Documento</th>
                         <th>Celular</th>
                         <th>Email</th>
                         <th>Activo</th>
                         <th>Editar</th>
                         <th>Borrar</th>
                      </tr>
                   </thead>
                   <tbody>
                      {clientes.map(ele=>
                         <tr key={ele.id}>
                            <td>{ele.id}</td>
                            <td>{ele.gnr_tercero.ter_razon.slice(0,60)}</td>
                            <td>{ele.gnr_tercero.ter_documento}</td>
                            <td>{ele.gnr_tercero.ter_movil}</td>
                            <td>{ele.gnr_tercero.ter_email}</td>
                            <td>
                               {ele.ven_activo==1 
                                    ? <FaToggleOn size="18" className="text-green-400 cursor-pointer hover:text-green-600" onClick={()=>cambiaEstadoCliente(ele.id)}/> 
                                    : <FaToggleOff size="18" className="text-red-400 cursor-pointer hover:text-red-600" onClick={()=>cambiaEstadoCliente(ele.id)}/>}
                            </td>
                            <td><FaEdit size="18" className="hover:text-blue-600" onClick={()=>seleccionarCliente(ele.id)}/></td>
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
                className="w-full md:w-[100%] border-2 bg-gray-100 p-2 text-left text-[18px] rounded-lg text-black" 
                onHide={() => { if (!ventana) return; setVentana(false)}}>
                <h3 className="w-full text-center">Actualizacion Registro</h3>
                <div className="grid grid-cols-2 gap-2 p-6 mt-4">

                {/* Informacion personal */}
                <div className="w-full shadow-lg shadow-accent p-2">
                    <h1 className="bg-accent text-white text-[20px] font-bold text-center rounded-lg">INFORMACION PERSONAL</h1>
                    <div className="grid grid-cols-3 gap-1 text-[14px] mt-2">
                       {/* razon social */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Razón Social</h1>
                       <h1 className="col-span-2 border-2 px-2 border-gray-300 rounded-lg">{cliente.ter_razon}</h1>
                       {/* Tipo y numero de documento */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Tipo y Número Documento</h1>
                       <select className="col-span-1 border-2 px-2 border-gray-300 rounded-lg" 
                            value={cliente.tipodoc_id}
                            onChange={(e)=>cambios(e)}
                            name="tipodoc_id">
                            <option value="0">Seleccione Tipo Documento</option>
                            {tipodocu.map(tip=>
                              <option key={tip.id} value={tip.id}>{tip.tdoc_nombre}</option>
                            )}
                       </select>
                       <input type="text" 
                           name="ter_documento"
                           value={cliente.ter_documento}
                           placeholder="#Documento"
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* Apellidos */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Apellidos</h1>
                       <input type="text" 
                           name="ter_apellido1"
                           placeholder="Primer Apellido"
                           value={cliente.ter_apellido1}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       <input type="text" 
                           name="ter_apellido2"
                           placeholder="Segundo Apellido"
                           value={cliente.ter_apellido2}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* nombres */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Nombres</h1>
                       <input type="text" 
                           name="ter_nombre1"
                           placeholder="Primer Nombre"
                           value={cliente.ter_nombre1}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       <input type="text" 
                           name="ter_nombre2"
                           placeholder="Segundo Nombre"
                           value={cliente.ter_nombre2}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* Pais y fecha de nacimiento */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Pais y Fecha Nacimiento</h1>
                       <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg"
                            onChange={(e)=>cambios(e)}
                            value={cliente.pais_id}
                            name="pais_id">
                       <option value="0">Seleccione Pais</option>
                       {paises.map(pai=>
                           <option key={pai.id} value={pai.id}>{pai.pai_nombre}</option>
                       )}
                       </select>
                       <input type="date" 
                           name="fechanac"
                           placeholder="Fecha Nac."
                           value={cliente.fechanac}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* Dpto y ciudad de nacimiento */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dpto y Ciudad Nacimiento</h1>
                       <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                            onChange={(e)=>cambios(e)}
                            value={cliente.dpto_id}
                            name="dpto_id">
                       <option value="0">Seleccione Dpto</option>
                       {dptos.map(dpt=>
                           <option key={dpt.id} value={dpt.id}>{dpt.dep_nombre}</option>
                       )}
                       </select>
                       <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                            value={cliente.ciudad_id}
                            onChange={(e)=>cambios(e)}
                            name="ciudad_id">
                       <option value="0">Seleccione Ciudad</option>
                       {ciudades.map(ciu=>
                          <option key={ciu.id} value={ciu.id}>{ciu.ciu_nombre}</option>
                        )}
                        </select>
                        {/* Dpto y ciudad de residencia */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dpto y Ciudad Residencia</h1>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg"
                            value={cliente.dptores_id}
                            onChange={(e)=>cambios(e)}
                            name="dptores_id">
                        <option value="0">Seleccione Dpto</option>
                        {dptosres.map(dpr=>
                           <option key={dpr.id} value={dpr.id}>{dpr.dep_nombre}</option>
                        )}
                        </select>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                            value={cliente.ciures_id}
                            onChange={(e)=>cambios(e)}
                            name="ciures_id">
                        <option value="0">Seleccione Ciudad</option>
                        {ciudadesres.map(cir=>
                           <option key={cir.id} value={cir.id}>{cir.ciu_nombre}</option>
                        )}
                        </select>
                        {/* direccion y barrio */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dirección y Barrio</h1>
                        <input type="text" 
                           name="ter_direccion"
                           placeholder="Dirección"
                           value={cliente.ter_direccion}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <input type="text" 
                           name="barrio"
                           placeholder="Barrio"
                           value={cliente.barrio}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        {/* Telefono fijo y celular */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Telefono fijo y Celular</h1>
                        <input type="text" 
                           name="ter_telefono"
                           placeholder="Telefono fijo"
                           value={cliente.ter_telefono}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       <input type="text" 
                           name="ter_celular"
                           placeholder="Celular"
                           value={cliente.ter_celular}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* correo electronico */}
                       <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Correo Electrónico</h1>
                       <input type="email" 
                           name="ter_email"
                           placeholder="Email"
                           value={cliente.ter_email}
                           onChange={(e)=>cambios(e)}
                           className="col-span-2 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       </div>
                </div>

                {/*Informacion laboral*/}
                <div className="w-full ml-3 shadow-lg shadow-accent p-2">
                    <h1 className="bg-accent text-white text-[20px] font-bold text-center rounded-lg">INFORMACION LABORAL</h1>
                    <div className="grid grid-cols-3 gap-1 text-[14px] mt-2">
                        {/* pagaduria */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Empresa Laboral en Convenio</h1>
                        <select className="col-span-2 w-full border-2 px-2 border-gray-300 rounded-lg"
                            value={cliente.empresa_id}
                            onChange={(e)=>cambios(e)}
                            name="empresa_id">
                           <option value="0">Seleccione Empresa</option>
                           {pagadurias.map(pag=>
                           <option key={pag.id} value={pag.id}>{pag.gnr_tercero.ter_razon}</option>
                        )}
                        </select>
                        {/* otra empresa no en convenio */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Otra Empresa</h1>
                        <input type="text" 
                            name="empresa"
                            placeholder="Empresa donde labora"
                            value={cliente.empresa}
                            onChange={(e)=>cambios(e)}
                            className="col-span-2 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        {/* Cargo y sueldo*/}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Cargo y Sueldo</h1>
                        <input type="text" 
                            name="cargo"
                            placeholder="Digite Cargo"
                            value={cliente.cargo}
                            onChange={(e)=>cambios(e)}
                            className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <input type="number" 
                            name="sueldo"
                            placeholder="Digite sueldo"
                            min="0"
                            value={cliente.sueldo}
                            onChange={(e)=>cambios(e)}
                            className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        {/* fECHA DE iNGRESO*/}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Fecha Ingreso</h1>
                        <input type="date" 
                            name="fechaing"
                            placeholder="Digite fecha Ingreso"
                            value={cliente.fechaing}
                            onChange={(e)=>cambios(e)}
                            className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <h1 className="col-span-1">&nbsp;</h1>    
                        {/* Direccion y telefono empresa*/}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dirección y Teléfono</h1>
                        <input type="text" 
                            name="dirempresa"
                            placeholder="Digite Dirección Empresa"
                            value={cliente.dirempresa}
                            onChange={(e)=>cambios(e)}
                            className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <input type="text" 
                            name="telempresa"
                            placeholder="Digite teléfono empresa"
                            value={cliente.telempresa}
                            onChange={(e)=>cambios(e)}
                            className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        {/* Dpto y ciudad laboral */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dpto y Ciudad Laboral</h1>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                             value={cliente.dptolab_id}
                             onChange={(e)=>cambios(e)}
                             name="dptolab_id">
                          <option value="0">Seleccione Dpto</option>
                          {dptoslab.map(dla=>
                             <option key={dla.id} value={dla.id}>{dla.dep_nombre}</option>
                          )}
                        </select>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                            value={cliente.ciulab_id}
                            onChange={(e)=>cambios(e)}
                            name="ciulab_id">
                          <option value="0">Seleccione Ciudad</option>
                          {ciulab.map(cla=>
                            <option key={cla.id} value={cla.id}>{cla.ciu_nombre}</option>
                          )}
                        </select>

                        <h1 className="col-span-3 bg-accent text-white text-[20px] font-bold text-center rounded-lg">INFORMACION ADICIONAL</h1>
                        {/* sexo y estado civil */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Sexo y Estado civil</h1>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                             value={cliente.sexo}
                             onChange={(e)=>cambios(e)}
                             name="sexo">
                          <option value="0">Seleccione Sexo</option>
                          <option value="1">Masculino</option>
                          <option value="2">Femenino</option>
                        </select>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                            value={cliente.estcivil_id}
                            onChange={(e)=>cambios(e)}
                            name="estcivil_id">
                            <option value="0">Seleccione Estado civil</option>
                            {estcivil.map(est=>
                             <option key={est.id} value={est.id}>{est.esc_detalles}</option>
                            )}
                        </select>
                        {/* nivel educcativo y ocupacion */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Nivel Educativo y Ocupación</h1>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                           value={cliente.niveducativo_id}
                           onChange={(e)=>cambios(e)}
                           name="niveducativo_id">
                          <option value="0">Seleccione Nivel Educativo</option>
                          {niveducativo.map(niv=>
                             <option key={niv.id} value={niv.id}>{niv.niv_detalles}</option>
                          )}
                        </select>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                            value={cliente.ocupacion_id}
                            onChange={(e)=>cambios(e)}
                            name="ocupacion_id">
                            <option value="0">Seleccione Ocupación</option>
                               {ocupacion.map(ocu=>
                                 <option key={ocu.id} value={ocu.id}>{ocu.ocu_detalles}</option>
                               )}
                        </select>
                        {/* tipo vivienda, personas a cargo */}
                        <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Vivienda y personas a cargo</h1>
                        <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" 
                              onChange={(e)=>cambios(e)}
                              value={cliente.vivienda_id}
                              name="vivienda_id">
                              <option value="0">Seleccione tipo vivienda</option>
                                {vivienda.map(viv=>
                                  <option key={viv.id} value={viv.id}>{viv.tip_detalles}</option>
                                )}
                        </select>
                        <input type="number" 
                           name="personasacargo"
                           min="0"
                           max="10"
                           placeholder="personas a cargo "
                           value={cliente.personasacargo}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                    </div>            
                </div>
                </div>
             </Dialog>
        </div>
    )
 };
 

export default GestionClientes;