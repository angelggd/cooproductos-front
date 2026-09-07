import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  {Dialog}  from 'primereact/dialog';
import { getPaises, getDptos, getCiudades, getTipodoc,
         getEstcivil, getNivEducativo, getOcupaciones, getVivienda } from '../services/srvGenerales';
import { getPagadurias, getVendedor } from '../services/srvCreditos';
import { verificaEmail, enviaSolicitud } from '../services/srvMailers';
import { saveTercero } from '../services/srvTerceros';
import { saveCliente } from '../services/srvClientes';
import { saveUser } from '../services/srvUsers';
import { saveSolicitud, devuelveFechaFormateada } from '../services/srvSolicitudes';
import { generarSolicitud } from '../services/srvReportes'

function VistaSolicitud() {
    let solicitud = JSON.parse(localStorage.getItem("solicitud"));
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [paises, setPaises] = useState([]);
    const [dptos, setDptos] = useState([]);
    const [dptosres, setDptosRes] = useState([]);
    const [dptoslab, setDptosLab] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [ciudadesres, setCiudadesRes] = useState([]);
    const [ciulab, setCiulab] = useState([]);
    const [pagadurias, setPagadurias] = useState([]);
    const [tipodocu, setTipodocu] = useState([]);
    const [vivienda, setVivienda] = useState([]);
    const [estcivil, setEstCivil] = useState([]);
    const [ocupacion, setOcupacion] = useState([]);
    const [niveducativo, setNivEducativo] = useState([]);
    const [vendedor, setVendedor] = useState([]);
    const [confirmar, setConfirmar] = useState(false);
    const [validador, setValidador] = useState(false);
    const [grabando, setGrabando] = useState(false);
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
        vendedor_id:0,
        cadena:"",
        cadenadig:"",
    });

    //funcion que se dispara cuando se van llenando los campos del formulario de datos del cliente
    const cambios = async(e) => {
        const propiedad = e.target.name;
        const valor = e.target.value;
        if(propiedad=="ter_apellido1") {
            const raz = valor+" "+cliente.ter_apellido2+" "+cliente.ter_nombre1+" "+cliente.ter_nombre2;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="ter_apellido2") {
            const raz = cliente.ter_apellido1+" "+valor+" "+cliente.ter_nombre1+" "+cliente.ter_nombre2;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="ter_nombre1") {
            const raz = cliente.ter_apellido1+" "+cliente.ter_apellido2+" "+valor+" "+cliente.ter_nombre2;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="ter_nombre2") {
            const raz = cliente.ter_apellido1+" "+cliente.ter_apellido2+" "+cliente.ter_nombre1+" "+valor;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="pais_id") {
            const id = Number(valor);
            setCliente({...cliente, pais_id:id, dpto_id:0, ciudad_id:0});
            await cargarDptos(id, 1);
            return;
        };
        if(propiedad=="dpto_id") {
            const id = Number(valor);
            setCliente({...cliente, dpto_id:id, ciudad_id:0});
            await cargarCiudades(id, 1);
            return;
        };
        if(propiedad=="dptores_id") {
            const id = Number(valor);
            setCliente({...cliente, dptores_id:id, ciures_id:0});
            await cargarCiudades(id, 2);
            return;
        };
        if(propiedad=="dptolab_id") {
            const id = Number(valor);
            setCliente({...cliente, dptolab_id:id, ciulab_id:0});
            await cargarCiudades(id, 3);
            return;
        };
        if(propiedad=="empresa_id") {
            const id = Number(valor);
            const reg = pagadurias.find(ele=>ele.id==id);
            setCliente({...cliente, empresa_id:id, empresa:reg.gnr_tercero.ter_razon});
            return;
        }
        setCliente({...cliente, [propiedad]:valor})
    };

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

    //cargar vendedores
    const cargarVendedores = async() => {
        const resul = await getVendedor({act:1});
        if(resul.status!==200) return;
        setVendedor(resul.data)
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
       cargarVendedores();
    }, []);

    //funcion que genera el token de firma digital
    const generaCadena = () => {
        const cadena1="0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        const dim1 = cadena1.length;
        let cad = "";
        let x = 0;
        for(var i=0;i<4;i++) {
           const n = Math.random();
           const v = parseInt(n * dim1);
           cad += cadena1[v];
           x +=1;
        };
        return cad
    };

    //funcion que genera el token de firma digital
    const generaToken = () => {
       const cadena1="0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789";
       const dim1 = cadena1.length;
       let cad = "";
       let x = 0;
       for(var i=0;i<24;i++) {
          const n = Math.random();
          const v = parseInt(n * dim1);
          cad += cadena1[v];
          x +=1;
          if(x==6){
             x = 0;
             cad += i<23 ?"-" :'';
          }
       };
       return cad
    };

    //funcion de validacion de informacion
    const validacion = () => {
        if(cliente.ter_email.length<6) return {error:true, msg:"Email debe tener al menos 6 caracteres"};
        if(cliente.ter_apellido1.length<3) return {error:true, msg:"Primer apellido debe tener al menos 3 caracteres"};
        if(cliente.ter_nombre1.length<3) return {error:true, msg:"Primer nombre debe tener al menos 3 caracteres"};
        if(cliente.ter_documento.length<4) return {error:true, msg:"Numero documento debe tener al menos 4 caracteres"};
        if(cliente.tipodoc_id==0) return {error:true, msg:"Debe seleccionar tipo de documento"};
        if(cliente.ciudad_id==0) return {error:true, msg:"Debe seleccionar ciudad de nacimiento"};
        if(cliente.ciures_id==0) return {error:true, msg:"Debe seleccionar ciudad de residencia"};
        if(cliente.ter_direccion.length==0) return {error:true, msg:"Debe digitar direccion de residencia"};
        if(cliente.ter_telefono.length==0 && cliente.ter_celular.length==0) return {error:true, msg:"Debe digitar teléfono o celular"};
        if(cliente.vivienda_id==0) return {error:true, msg:"Debe seleccionar tipo de vivienda"};
        if(cliente.ocupacion_id==0) return {error:true, msg:"Debe seleccionar ocupacion"};
        if(cliente.sexo==0) return {error:true, msg:"Debe seleccionar sexo"};
        return {error:false, msg:""}
    };

    //PAASO 1 funcion que abre la ventana para confirmar actualizacion de datos del cliente
    const paso1 = () => {
        const valida = validacion();
        if(valida.error) {
            toast.warning(valida.msg);
            return;
        };
        setGrabando(true)
        const cadena = generaCadena();
        setCliente({...cliente, cadena})
        setConfirmar(true);
    };

    //PASO2  se verifica que el codigo digitado sea igual a la cadena generada para continuar
    const paso2 = async() => {
       if(cliente.cadenadig!==cliente.cadena) {
          toast.warning("Cadena digitada no es igual a la cadena generada");
          return;
       };
       setConfirmar(false);
       const clien = {
          apellido1: cliente.ter_apellido1, 
          apellido2: cliente.ter_apellido2, 
          nombre1: cliente.ter_nombre1, 
          nombre2: cliente.ter_nombre2, 
          email: cliente.ter_email, 
          documento: cliente.ter_documento, 
       };
       const resul = await verificaEmail(clien);
       if(resul.status!==200) {
          toast.error("Ocurrio un error al intentar validar el email del cliente");
          return;
       };
       const codigo = resul.data.codigo;
       setCliente({...cliente, cadena:codigo, cadenadig:""});
       setValidador(true);
    };

    //funcion de verificacion final para grabar informacion y enviar la solicitud
    const paso3 = async() => {
       if(cliente.cadenadig!==cliente.cadena) {
          toast.error("Código digitado invalido");
          return;
       };
       let idcliente = cliente.id;
       let idtercero = cliente.tercero_id;
       let idusuario = user.id;
       //procedemos a guardar la informacion del tercero
       if(cliente.tercero_id==0) {
          const tercero = {
             ter_razon: cliente.ter_razon,
             ter_apellido1: cliente.ter_apellido1,
             ter_apellido2: cliente.ter_apellido2,
             ter_nombre1: cliente.ter_nombre1,
             ter_nombre2: cliente.ter_nombre2,
             ter_documento: cliente.ter_documento,
             tipodoc_id: cliente.tipodoc_id,
             ter_telefono: cliente.ter_telefono,
             ter_movil: cliente.ter_celular,
             ter_direccion: cliente.ter_direccion,
             ter_email: cliente.ter_email,
             tipopersona_id: 2,
             ciudad_id: cliente.ciudad_id,
             respfiscal_id: 1,
          };
          const resul1 = await saveTercero(tercero);
          if(resul1.status!==200) {
             toast.error("Ocurrio un error al guardar el tercero");
             return;
          };
          toast.success("Tercero actualizado");
          idtercero = resul1.data.registro.id;
       };  //fin grabacion del tercero
       
       //si el usuario no esta logueado creamos un usuario
       if(idusuario==0) {
          const nuser = {
            usu_login: cliente.ter_email,
            tercero_id: idtercero,
            roll_id: 1,
            documento: cliente.ter_documento,
          };
          const resul3 = await saveUser(nuser);
          if(resul3.status!==200) {
             toast.error("Ocurrio un error al crear el usuario");
             return;
          };
          idusuario = resul3.data.resul.id;
          toast.success("Usuario creado");
       }; //fin grabacion del usuario

       //ahora grabamos en la tabla de clientes
       if(idcliente==0) {
          const xcliente = {
             tercero_id: idtercero,
             cli_fallecido: 0,
             cli_razonsocial: cliente.ter_razon,
             cli_fechanac: cliente.fechanac,
             cli_sexo: cliente.sexo,
             cli_barrio: cliente.barrio,
             ciudadres_id: cliente.ciures_id,
             ocupacion_id: cliente.ocupacion_id,
             estadocivil_id: cliente.estcivil_id,
             niveducativo_id: cliente.niveducativo_id,
             vivienda_id: cliente.vivienda_id,
             cli_personasacargo: cliente.personasacargo,
             usuario_id: idusuario,
             pagaduria: {
                det_activa: 1,
                det_ingreso: cliente.fechaing,
                det_cargo: cliente.cargo,
                det_sueldo: cliente.sueldo,
                ciudad_id: cliente.ciulab_id,
                pagaduria_id: cliente.empresa_id,
             }
          };
          const resul2 = await saveCliente(xcliente);
          if(resul2.status!==200) {
             toast.error("Ocurrio un error al guardar cliente");
             return;
          };
          const nuevocliente = resul2.data.registro;
          toast.success("Cliente actualizado");
          idcliente = nuevocliente.id;
       };  //fin grabacion del cliente

       //por ultimo procedemos a guardar la solicitud de credito
       const hoy = new Date();
       const fechaC = devuelveFechaFormateada(hoy);
       const firmadigital = generaToken();
       const nsolicitud = {
          sol_fechasolicitud: fechaC,
          sol_valorsolicitado: solicitud.monto,
          sol_tasa: solicitud.tasa,
          sol_numcuotas: solicitud.meses,
          sol_valorcuota: solicitud.cuota,
          sol_inversion: solicitud.inversion,
          vendedor_id: cliente.vendedor_id,
          usuario_id: idusuario,
          modelo_id: solicitud.modelo.id,
          cliente_id: idcliente,
          sol_empresa: cliente.empresa,
          sol_cargo: cliente.cargo,
          sol_fechaingreso: cliente.fechaing,
          sol_sueldo: cliente.sueldo,
          sol_dirempresa: cliente.dirempresa,
          sol_telempresa: cliente.telempresa,
          pagaduria_id: cliente.empresa_id,
          sol_token: firmadigital,
       };
       const resul4 = await saveSolicitud(nsolicitud);
       if(resul4.status!==200) {
          toast.error("Ocurrio un error al guardar la solicitud");
          return;
       };
       toast.success("Solicitud guardada");
       const xsolicitud = resul4.data;
       //procedemos a enviar un email al correo de la empresa y al correo del cliente
       const nom = cliente.ter_razon;
       const num = resul4.data.id;
       const numero =num.toString().padStart(7,'0');
       const fechaActual = new Date(resul4.data.sol_fechasolicitud);
       const nombreMes = fechaActual.toLocaleString('es-ES', { month: 'long' });
       const anio = fechaActual.getFullYear();
       const pdatos = {
          nombre: nom,
          cedula: cliente.documento,
          ciudad: "Barranquilla",
          valor: solicitud.monto.toLocaleString('es-CO'),
          cuotas: solicitud.meses,
          formapago: "mensuales",
          valorCuota: solicitud.cuota.toLocaleString('es-CO'),
          mesInicio: nombreMes,
          anioInicio: anio,
          empresa: cliente.empresa,
          token: solicitud.token,
          fecha: resul4.data.sol_fechasolicitud,
          numero: numero,
          token: firmadigital,
      }; 
      //generacion del archivo PDF
      const resul2 = await generarSolicitud(pdatos);
      if(!resul2.status==200) {
         toast.error("Ocurrio un error al generar el pdf de la solicitud");
         navigate('/');
         return;
      };
      //enviamos la solicitud al correo del cliente
      const resul5 = await enviaSolicitud(pdatos);
      if(resul5.status!==200) {
         toast.success("Ocurrio un error al enviar la solicitud al correo");
         navigate('/');
         return;
      };       
      toast.success("Solicitud enviada al correo del cliente");
      navigate('/');
    };

    return (
    <>
    <div className="font-sans bg-background text-gray-800 min-h-screen scroll-smooth">
       {/* Navbar */}
       <Navbar/>
       <div className="w-full flex justify-center mt-4 p-4">
          <div className="w-[40%] shadow-lg shadow-accent p-4">
              <h1 className="bg-accent text-white text-[20px] font-semibold text-center rounded-lg">DATOS SOLICTUD DE CREDITO</h1>
              <div className="grid grid-cols-3 gap-2 text-[18px] font-bold">
                 {solicitud.modelo==2 &&  
                    <h1 className="col-span-2 bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Monto solicitado</h1>
                 }
                 {solicitud.modelo==2 &&  
                    <h1 className="col-span-1 border-2 border-gray-200 text-center rounded-lg">${solicitud.monto.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h1>
                 }
                 <h1 className="col-span-2 bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Tasa del crédito</h1>
                 <h1 className="col-span-1 border-2 border-gray-200 text-center rounded-lg">{Number(solicitud.tasa).toFixed(6)}</h1>
                 <h1 className="col-span-2 bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Meses pactados</h1>
                 <h1 className="col-span-1 border-2 border-gray-200 text-center rounded-lg">{solicitud.meses}</h1>
                 <h1 className="col-span-2 bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Valor de la cuota</h1>
                 <h1 className="col-span-1 border-2 border-gray-200 text-center rounded-lg">${solicitud.cuota.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h1>
                 {solicitud.modelo==1 &&
                    <h1 className="col-span-2 bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Monto aprobado</h1>
                 }
                 {solicitud.modelo==1 &&
                    <h1 className="col-span-1 border-2 border-gray-200 text-center rounded-lg">${solicitud.monto.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h1>
                 }
                 <h1 className="col-span-1 bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Gestor Comercial</h1>
                 <select className="col-span-2 border-2 px-2 border-gray-300 rounded-lg text-[16px]"
                         value={cliente.vendedor_id}
                         onChange={(e)=>cambios(e)}
                         name="vendedor_id">
                    <option value="0">Seleccione Gestor</option>
                    {vendedor.map(ven=>
                        <option key={ven.id} value={ven.id}>{ven.ter_razon}</option>
                    )}
                 </select>
              </div>
          </div>  

       </div>
       {/* Formulario para capturar toda la informacion del cliente */}
       <div className="w-full flex mt-4 p-4">
          {/* Informacion personal */}
          <div className="w-[50%] shadow-lg shadow-accent p-2">
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
          <div className="w-[50%] ml-3 shadow-lg shadow-accent p-2">
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
       {/*se oculta el boton cuando esta en proceso de grabacion */}
       {grabando == false &&
          <div className="w-full flex mt-4 justify-center">
              <button className="bg-green-600 text-white text-center py-2 px-10 mb-10 rounded-lg text-[20px] cursor-pointer hover:bg-green-800"
              onClick={()=>paso1()}
              >Enviar Solicitud</button>
          </div>
       }
       {/*Caja de confirmacion*/}
       <Dialog header="" 
            visible={confirmar} 
            className="w-full md:w-[30%] border-2 bg-blue-500 p-2 text-left text-[20px] rounded-lg text-white" 
            onHide={() => { if (!confirmar) return; setConfirmar(false); setGrabando(false)}}>
            <h1 className="w-full text-center">Confirme actualización de datos</h1>  
            <div className="grid grid-cols-2 gap-2 p-6 mt-4">
                <h2 className="text-[14px] bg-blue-900 rounded-lg text-center">Cadena Generada</h2>
                <h2 className="text-[14px] bg-blue-900 rounded-lg text-center">Digite la cadena generada</h2>
                <h1 className="p-2 w-full rounded-lg text-center border-2">{cliente.cadena}</h1>
                <input type="text" 
                       className="border-2 rounded-lg text-center"
                       maxLength={4}
                       value={cliente.cadenadig}
                       onChange={(e)=>cambios(e)}
                       name="cadenadig" />
            </div>
            <p className="mt-4 text-[12px] w-full text-center">Se enviará un código de seguridad para validar su correo</p>  
            <div className="grid grid-cols-2 gap-4 p-6">
                <button className="bg-white text-blue-500 rounded-lg p-2" onClick={()=>paso2()}>SI</button>
                <button className="bg-white text-blue-500 rounded-lg p-2" onClick={()=>{setConfirmar(false); setGrabando(false)}}>NO</button>
            </div>
       </Dialog>
       {/*Caja de validacion final*/}
       <Dialog header="" 
            visible={validador} 
            className="w-full md:w-[30%] border-2 bg-blue-500 p-2 text-left text-[20px] rounded-lg text-white" 
            onHide={() => { if (!validador) return; setValidador(false); setGrabando(false)}}>
            <h1 className="w-full text-center bg-blue-900">Verificación Final</h1>
            <p className="mt-4 text-[12px] w-full text-center">Después de validar el código enviado a su correo, el sistema guardará de forma definitiva los datos del cliente y enviará la solicitud de crédito</p>  
            <div className="grid grid-cols-2 gap-1 p-6 mt-4">
                <input type="text" 
                       className="col-span-2 border-2 rounded-lg text-center"
                       maxLength={6}
                       value={cliente.cadenadig}
                       onChange={(e)=>cambios(e)}
                       placeholder="Digite código enviado"
                       name="cadenadig" />
                <h1 className="col-span-2">&nbsp;</h1>       
                <button className="bg-white text-blue-500 rounded-lg p-2 cursor-pointer hover:bg-gray-300" onClick={()=>paso3()}>Enviar Solicitud</button>
                <button className="bg-white text-blue-500 rounded-lg p-2 cursor-pointer hover:bg-gray-300" onClick={()=>{setValidador(false); setGrabando(false)}}>Cancelar</button>
            </div>
        </Dialog>           
       {/* Footer */}
      <Footer />
    </div>     
    </>
  );
}
export default VistaSolicitud; 