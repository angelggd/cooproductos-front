import { useState, useEffect } from 'react';
import { getTasaByPeriodo, getModelos } from '../services/srvCreditos';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { getParametroByCod } from '../services/srvGenerales';

export default function CreditSimulator() {
  const navigate = useNavigate();
  const [monto, setMonto] = useState(null);
  const [meses, setMeses] = useState(10);
  const [cuota, setCuota] = useState(0);
  const [tasaAnual, setTasaAnual] = useState(0.00);
  const [inversion, setInversion] = useState(0);
  const [tasa, setTasa] = useState(0.000000);
  const [modelos, setModelos] = useState([]);
  const [utilidad, setUtilidad] = useState(0.00);
  const [modelo, setModelo] = useState({id:0, mod_nombre:"",mod_tipo:0, mod_tasa:0.00, mod_tipointeres:1});  

  //funcion que carga la tasa efectiva actual
  const getTasa = async() => {
     const hoy = new Date();
     const anual = hoy.getFullYear();
     const mes = hoy.getMonth() + 1;
     const query = {tas_anual:anual, tas_mes:mes};
     const resul = await getTasaByPeriodo(query);
     if(resul.status!==200) {
        toast.error("Error al consultar la tasa efectiva anual");
        return;
     };
     if(resul.data.errorCode>0) {
        toast.warning(resul.data.msg)
        return;
     };
     const datos = resul.data.registro;
     setTasaAnual(Number(datos.tas_valor));
     let TEAX = Number(datos.tas_valor)/100;
     const nTasa = (1 + TEAX)**(1 / 12) - 1;
     setTasa(nTasa*100);
  };

  //cargue de los modelos de creditos activos
  const cargarModelos = async() => {
      const resul = await getModelos({act:1});
      if(resul.status!==200) {
         toast.error("Ocurrio un error al cargar los modelos de credito");
         return;
      };
      setModelos(resul.data);
  };

  //cargue de la utilidad
  const cargarUtilidad = async() => {
     const resul = await getParametroByCod({codigo:"001"});
     if(resul.status!==200) {
        toast.error("Ocurrio un error al cargar el parametro 001");
        return;
     };
     const uti = Number(resul.data.par_valor);
     setUtilidad(uti);
  };

  useEffect(() => {
     getTasa();
     cargarUtilidad();
     cargarModelos();
  }, []);


  //funcion que ejecuta los calculos del simulador
  const calcularCredito = async(e) => {
      e.preventDefault();
      if(modelo.id==0) {
         toast.info("Debe seleccionar modelo de credito");
         return;
      };
      if (!monto || monto <= 0) {
         toast.info("Digite monto a solicitar");
         return;
      };
      const tasaReal = Number(modelo.mod_tasa);
      const tasaFiscal = Number(tasa);  
      const xmonto = parseInt(monto);
      
      if(modelo.mod_tipo==1) {  // aumento inversion 
         const vint = xmonto * tasaReal / 100;  //calculamos el interes mensual a la tasa real
         const tint = parseInt(vint * meses);   //calculamos el total interes
         let tcredito = xmonto + tint;  //calculamos el total del credito   
         let vcuota = parseInt(tcredito/meses);  //calculo inicial de la cuota a la tasa real
         let vpresente = tcredito / (1 + ((tasaFiscal / 100) * meses));  //hallamos el valor presente a interes simple
         vpresente = parseInt(vpresente);
         const aestudio = vpresente - xmonto;
         const xtasa = tasaFiscal/100;
         if(modelo.mod_tipointeres==1) {  //calculamos la cuota a interes compuesto
             vcuota = vpresente * (xtasa / (1 - (1 + xtasa)**(-meses)));
         } else {  //calculo de la cuota a interes simple
             const vint = vpresente * xtasa;
             const tint = parseInt(vint * meses);
             tcredito = vpresente + tint;
             vcuota = parseInt(tcredito / meses);
         };    
         tcredito = vcuota * meses;
         setCuota(parseInt(vcuota));
         setInversion(vpresente);
         return;
      };
      
      if(modelo.mod_tipo==8) {  //modelo joalsa
         const por_uti = Number(utilidad)/100;
         const aval = por_uti * 1.19;
         const dif_aval = 1 - aval;
         let ninversion = parseInt(monto / dif_aval);
         const aestudio = ninversion - monto;
         const tasaC = tasaFiscal/100;
         const vcuota1= tasaC * ( 1 + tasaC ) ** meses;
         const vcuota2= ( 1 + tasaC ) ** meses-1
         const vcuota = ninversion * ( vcuota1 / vcuota2 );
         setCuota(parseInt(vcuota));
         setInversion(ninversion);
         return;
      };
  };

  //funcion q se dispara cuando se hacen cambios
  const cambios = (e) => {
     e.preventDefault();
     const propiedad = e.target.name;
     const valor = Number(e.target.value);
     if(propiedad=="meses") setMeses(valor);
     if(propiedad=="modelo") {
        const reg = modelos.find(ele=>ele.id==valor);
        setModelo(reg);
        setCuota(0);
        setMonto(0);
        return;
     }
     if(propiedad=="monto") setMonto(valor);
  };

  const cargaSolicitud = () => {
     if(monto==0 || cuota==0) {
        toast.warning("No se han realizado los calculos de la cuota o el monto del credito");
        return;
     };
     const solicitudJSON = JSON.stringify({
        modelo,
        cuota,
        monto,
        meses,
        tasa,
        inversion,
     });
     localStorage.setItem("solicitud", solicitudJSON);
     navigate('/VistaSolicitud');
  };

  return (
    <section id="simulador" className="py-16 bg-background">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-3xl font-bold text-primary text-center mb-6">Simula tu Crédito</h3>
        
        <form onSubmit={calcularCredito} className="space-y-5">
          <div className="grid grid-cols-3 gap-2 bg-accent text-white mb-2 rounded-lg p-2">
             <h1 className="col-span-1 w-full text-center">Modelo</h1>
             <select name="modelo" 
                     value={modelo.id}
                     onChange={(e)=>cambios(e)}
                     className="col-span-2 text-center boder-2 bg-accent w-full">
                <option value="0">Seleccione Modelo</option>
                {modelos.map(mod=>
                   <option key={mod.id} value={mod.id}>{mod.mod_nombre}</option>
                )}
             </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Monto Solicitado ($)</label>
            <input 
              type="number" 
              value={monto}
              name="monto"
              min={0}
              onChange={(e) => cambios(e)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all"
              placeholder="Ej. 500000"
              required
            />
          </div>  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Plazo (Meses)</label>
            <input 
              type="range" 
              min="2"
              max="60"
              step="2"
              value={meses}
              name="meses"
              onChange={(e) => cambios(e)}
              className="w-full accent-accent"
            />
            <div className="text-center text-primary font-bold mt-2">{meses} meses</div>
            <div className="text-center text-primary font-bold mt-2">Tasa : {tasa.toFixed(4)}%</div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md">
            Calcular Cuota
          </button>
        </form>

        {cuota>0 && (
          <div className="mt-8 p-6 bg-primary text-white rounded-xl text-center shadow-inner transition-opacity duration-500">
            <p className="text-lg opacity-90">Valor Cuota Calculada:</p>
            <p className="text-4xl font-bold text-accent mt-2">
              ${cuota.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </p>
            <button className="w-full rounded-lg bg-amber-300 text-black text-center mt-4 p-2 font-bold cursor-pointer hover:bg-amber-400"
               onClick={()=>cargaSolicitud()}
            >¡SOLICITALO YA!</button>
          </div>
        )}

        <p className="mb-3 text-[12px] text-center">Los valores mostrados son aproximados y no constituyen una oferta vinculante. La tasa, cuota y condiciones finales pueden variar según el análisis crediticio y las tasas vigentes al momento de la aprobación.</p>
      </div>
    </section>
  );
}