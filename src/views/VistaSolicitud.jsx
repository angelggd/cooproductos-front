import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

function VistaSolicitud() {
    let solicitud = JSON.parse(localStorage.getItem("solicitud"));
    const [cliente, setCliente] = useState({
        id: 0,
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
    });

    const cambios = (e) => {
        const propiedad = e.target.name;
        const valor = e.target.value;
        setCliente({...cliente, [propiedad]:valor})
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
                 <select className="col-span-1 border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Tipo Documento</option>
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
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Pais</option>
                 </select>
                 <input type="date" 
                        name="fechanac"
                        placeholder="Fecha Nac."
                        value={cliente.fechanac}
                        onChange={(e)=>cambios(e)}
                        className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" />
                 {/* Dpto y ciudad de nacimiento */}
                 <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dpto y Ciudad Nacimiento</h1>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Dpto</option>
                 </select>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Ciudad</option>
                 </select>
                 {/* Dpto y ciudad de residencia */}
                 <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dpto y Ciudad Residencia</h1>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Dpto</option>
                 </select>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Ciudad</option>
                 </select>
                 {/* direccion y barrio */}
                 <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Dirección y Barrio</h1>
                 <input type="text" 
                        name="ter_dirección"
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
                 <select className="col-span-2 w-full border-2 px-2 border-gray-300 rounded-lg" name="empresa_id">
                    <option value="0">Seleccione Empresa</option>
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
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Dpto</option>
                 </select>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Ciudad</option>
                 </select>

                <h1 className="col-span-3 bg-accent text-white text-[20px] font-bold text-center rounded-lg">INFORMACION ADICIONAL</h1>

                 {/* sexo y estado civil */}
                 <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Sexo y Estado civil</h1>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Sexo</option>
                 </select>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Estado civil</option>
                 </select>
                 {/* nivel educcativo y ocupacion */}
                 <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Nivel Educativo y Ocupación</h1>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Nivel Educativo</option>
                 </select>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione Ocupación</option>
                 </select>
                 {/* tipo vivienda, personas a cargo */}
                 <h1 className="col-span-1 bg-green-100 text-black rounded-lg text-center border-2 border-green-200">Vivienda y personas a cargo</h1>
                 <select className="col-span-1 w-full border-2 px-2 border-gray-300 rounded-lg" name="tipodoc">
                    <option value="0">Seleccione tipo vivienda</option>
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
       <div className="w-full flex mt-4 justify-center">
           <button className="bg-green-600 text-white text-center py-2 px-10 mb-10 rounded-lg text-[20px] cursor-pointer hover:bg-green-800">Enviar Solicitud</button>
       </div>
       {/* Footer */}
       <Footer />
      
    </div>     
    </>
  );
}
export default VistaSolicitud; 