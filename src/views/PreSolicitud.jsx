import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  {Dialog}  from 'primereact/dialog';
import { getTipodoc } from '../services/srvGenerales';

function PreSolicitud() {
    let solicitud = JSON.parse(localStorage.getItem("solicitud"));
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [validaI, setValidaI] = useState(false);
    const [tipodocu, setTipodocu] = useState([]);
    const [cliente, setCliente] = useState({
        ter_razon: "",
        ter_apellido1: "",
        ter_apellido2: "",
        ter_nombre1: "",
        ter_nombre2: "",
        ter_documento: "",
        ter_email: "",
        ter_celular: "",
        tipodoc_id: 0,
        tipopersona_id: 2,
        robot:0,
    });
    useEffect(() => {
      cargarTipodoc();
    }, []);
    
    //cargar tipo de documento
    const cargarTipodoc = async() => {
        const resul = await getTipodoc();
        if(resul.status!==200) return;
        setTipodocu(resul.data);
    };

        //funcion que se dispara cuando se van llenando los campos del formulario de datos del cliente
    const cambios = async(e) => {
        const propiedad = e.target.name;
        const valor = e.target.value;
        if(propiedad=="robot") {
           const va = cliente.robot==0 ? 1 : 0;
           setCliente({...cliente, robot:va});
           return;
        };
        if(propiedad=="tipopersona_id") {
           if(valor==1) {
              setCliente({...cliente, tipopersona_id:1,ter_apellido1:"",ter_apellido2:"",ter_nombre1:"",ter_nombre2:""});
              return;
           };
        };
        if(propiedad=="ter_razon") {
           if(cliente.tipopersona_id==2) return;
        };
        if(propiedad=="ter_apellido1") {
            if(cliente.tipopersona_id==1) return;
            const raz = valor+" "+cliente.ter_apellido2+" "+cliente.ter_nombre1+" "+cliente.ter_nombre2;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="ter_apellido2") {
            if(cliente.tipopersona_id==1) return;
            const raz = cliente.ter_apellido1+" "+valor+" "+cliente.ter_nombre1+" "+cliente.ter_nombre2;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="ter_nombre1") {
            if(cliente.tipopersona_id==1) return;
            const raz = cliente.ter_apellido1+" "+cliente.ter_apellido2+" "+valor+" "+cliente.ter_nombre2;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        if(propiedad=="ter_nombre2") {
            if(cliente.tipopersona_id==1) return;
            const raz = cliente.ter_apellido1+" "+cliente.ter_apellido2+" "+cliente.ter_nombre1+" "+valor;
            setCliente({...cliente, [propiedad]:valor, ter_razon:raz});
            return;
        };
        setCliente({...cliente, [propiedad]:valor})
    };

    //funcion de validacion de informacion
    const validacion = () => {
        if(cliente.robot==0) return {error:true, msg:"Robot detectado"};
        if(cliente.ter_email.length<6) return {error:true, msg:"Email debe tener al menos 6 caracteres"};
        if(cliente.ter_razon.length<10) return {error:true, msg:"Razon social debe tener al menos 10 caracteres"};
        if(cliente.tipopersona_id==2) {
           if(cliente.ter_apellido1.length<3) return {error:true, msg:"Primer apellido debe tener al menos 3 caracteres"};
           if(cliente.ter_nombre1.length<3) return {error:true, msg:"Primer nombre debe tener al menos 3 caracteres"};
        };
        if(cliente.ter_documento.length<4) return {error:true, msg:"Numero documento debe tener al menos 4 caracteres"};
        if(cliente.tipodoc_id==0) return {error:true, msg:"Debe seleccionar tipo de documento"};
        if(cliente.ter_celular.length==0) return {error:true, msg:"Debe digitar numero celular"};
        return {error:false, msg:""}
    };

    const validaIdentidad = () => {
       const valida = validacion();
       if(valida.error) {
          toast.warning(valida.msg);
          return;
       };
       setValidaI(true);
       window.open("https://app2.zapsign.com.br/access/sign-in", "_blank") 
    };

    const seguirSolicitud = () => {
        const clienteJSON = JSON.stringify(cliente);
        localStorage.setItem("cliente", clienteJSON);      
        navigate('/VistaSolicitud')
    };
    
    return (
       <div>
           <div className="font-sans bg-background text-gray-800 min-h-screen scroll-smooth">
              <Navbar/>
              <div className="w-full flex justify-center mt-2 md:p-4">
                 <div className="w-full md:w-[70%] shadow-lg shadow-accent p-4">
                    <h1 className="text-accent text-[20px] font-semibold text-center rounded-lg">SOLICITUD DE CREDITO</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 text-[14px] md:text-[18px] font-bold mt-2 text-gray-500">
                       <div>  
                          <h1 className="bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Monto solicitado</h1>
                          <h1 className="border-2 border-gray-200 text-center rounded-lg">${solicitud.monto.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h1>
                       </div>   
                       <div>
                          <h1 className="bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Tasa del crédito</h1>
                          <h1 className="border-2 border-gray-200 text-center rounded-lg">{Number(solicitud.tasa).toFixed(6)}</h1>
                       </div>
                       <div>
                          <h1 className="bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Meses pactados</h1>
                          <h1 className="border-2 border-gray-200 text-center rounded-lg">{solicitud.meses}</h1>
                       </div>
                       <div>
                          <h1 className="bg-green-50 border-2 border-green-300 px-2 rounded-lg text-center">Valor de la cuota</h1>
                          <h1 className="border-2 border-gray-200 text-center rounded-lg">${solicitud.cuota.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h1>
                       </div>
                    </div>
                 </div>  
              </div>
              {/*Caja para llenar datos basicos */}
              <div className="w-full flex justify-center mt-2 md:p-4">
                  <div className="w-full md:w-[70%] shadow-lg shadow-accent py-4 px-4 md:px-30">
                     <h1 className="text-accent text-[20px] font-semibold text-center rounded-lg">DATOS BASICOS</h1>
                     <div className="grid grid-cols-2 gap-1 text-[11px] md:text-[14px] mt-2 text-gray-500">
                        {/* tipo persona y razon social */}
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Razón Social</h1>
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Tipo Persona</h1>
                        <input type="text" 
                           name="ter_razon"
                           placeholder="Razòn Social"
                           value={cliente.ter_razon}
                           onChange={(e)=>cambios(e)}
                           maxLength={100}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <select name="tipopersona_id"
                           value={cliente.tipopersona_id}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 border-2 px-2 border-gray-300 rounded-lg">
                           <option value="1">Persona Jurìdica</option>
                           <option value="2">Persona Natural</option>
                        </select>
                        {/* Apellidos */}
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Primer Apellido</h1>
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Segundo Apellido</h1>
                        <input type="text" 
                           name="ter_apellido1"
                           placeholder="Primer Apellido"
                           value={cliente.ter_apellido1}
                           maxLength={30}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <input type="text" 
                           name="ter_apellido2"
                           placeholder="Segundo Apellido"
                           value={cliente.ter_apellido2}
                           onChange={(e)=>cambios(e)}
                           maxLength={30}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        {/* nombres */}
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Primer Nombre</h1>
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Segundo Nombre</h1>
                        <input type="text" 
                           name="ter_nombre1"
                           placeholder="Primer Nombre"
                           value={cliente.ter_nombre1}
                           onChange={(e)=>cambios(e)}
                           maxLength={30}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        <input type="text" 
                           name="ter_nombre2"
                           placeholder="Segundo Nombre"
                           value={cliente.ter_nombre2}
                           maxLength={30}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                        {/* Tipo y numero de documento */}
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Tipo Documento</h1>
                        <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Número Documento</h1>
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
                           maxLength={12}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* Telefono celular y email*/}
                       <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Nùmero Celular</h1>
                       <h1 className="col-span-1 text-black rounded-lg border-2 border-gray-50 font-semibold text-[10px] md:text-[12px]">Correo Electrònico</h1>
                       <input type="text" 
                           name="ter_celular"
                           placeholder="Celular"
                           value={cliente.ter_celular}
                           maxLength={20}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       <input type="email" 
                           name="ter_email"
                           placeholder="Email"
                           value={cliente.ter_email}
                           maxLength={100}
                           onChange={(e)=>cambios(e)}
                           className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                       {/* captcha */}
                       <div className="flex justify-center col-span-2 p-2">
                           <input type="checkbox"
                                  name="robot"
                                  value={cliente.robot}
                                  onChange={(e)=>cambios(e)}
                                  className=""
                           />
                           <h1 className="">No soy un Robot</h1>
                       </div>    
                       {/* botones de acceso */}    
                       <button className="bg-green-400 text-white p-2 rounded-lg text-lg hover:bg-green-600 cursor-pointer" onClick={()=>validaIdentidad()}>Validar Identidad</button>
                       <button className={`text-white rounded-lg p-2 text-lg ${validaI ? "bg-green-400 hover:bg-green-600 cursor-pointer" :"bg-gray-300"}`} onClick={()=>seguirSolicitud()}>Continuar Solicitud</button>
                     </div>
                  </div>
              </div>

              <Footer />
           </div>   
       </div>
    )
}

export default PreSolicitud;