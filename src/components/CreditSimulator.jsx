import { useState, useEffect } from 'react';
import { getTasaByPeriodo } from '../services/srvCreditos';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function CreditSimulator() {
  const navigate = useNavigate();
  const [monto, setMonto] = useState(null);
  const [meses, setMeses] = useState(10);
  const [cuota, setCuota] = useState(0);
  const [tasaAnual, setTasaAnual] = useState(0.00);
  const [tasa, setTasa] = useState(0.000000);
  const [modelo, setModelo] = useState(1);  //modelo credito 1 cuota predefinida

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

  useEffect(() => {
     getTasa();
  }, []);


  //funcion que ejecuta los calculos del simulador
  const calcularCredito = async(e) => {
      e.preventDefault();
      const por_utilidad = 32  //pendiente por cargarlo de un parametro
      if(modelo==1) {  //modelo cuota predefinida
         const cuotaM = parseFloat(cuota);
         if (!cuotaM || cuotaM <= 0) return;
         const xtasa=Number(tasa)/100;
         let vp1=cuotaM*((1+Number(xtasa))**meses-1);
         let vp2=(Number(xtasa)*(1+Number(xtasa))**meses);
         const vpresente=vp1/vp2;
         const aval = vpresente*por_utilidad/100;
         const tmonto = parseFloat(vpresente-aval);
         setMonto(tmonto);
      } else {  //monto solicitado
         const xmonto = parseFloat(monto);
         if (!xmonto || xmonto <= 0) return;
         const xtasa=Number(tasa)/100;
         const por = por_utilidad/100;
         const aval = por * 1.19 ;    
         const dife_aval = 1 - aval;
         const inversion = xmonto / dife_aval;
         const aestudio = inversion - xmonto;
         let VADI = 0 ;  //suma de conceptos no capitalizables (pendiente)
         let vcuota = inversion*(xtasa/(1-(1+xtasa)**(-meses)))+(VADI/meses,0);
         setCuota(parseFloat(vcuota));
      }
  };

  //funcion q se dispara cuando se hacen cambios
  const cambios = (e) => {
     e.preventDefault();
     const propiedad = e.target.name;
     const valor = Number(e.target.value);
     if(propiedad=="cuota") setCuota(valor);
     if(propiedad=="meses") setMeses(valor);
     if(propiedad=="modelo") {
        setModelo(valor);
        setCuota(0);
        setMonto(0);
        return;
     }
     if(propiedad=="monto") setMonto(valor);
     if(modelo==1) setMonto(0);
     if(modelo==2) setCuota(0);
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
             <h1 className="w-full text-center">Modelo</h1>
             <select name="modelo" 
                     value={modelo}
                     onChange={(e)=>cambios(e)}
                     className="text-center boder-2 bg-accent w-full">
                <option value="1">Cuota Predefinida</option>
                <option value="2">Monto Solicitado</option>
             </select>
          </div>
          {modelo==1 ?
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cuota Mensual Disponible ($)</label>
            <input 
              type="number" 
              value={cuota}
              name="cuota"
              min={0}
              onChange={(e) => cambios(e)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all"
              placeholder="Ej. 500000"
              required
            />
          </div>  :
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
          }
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
            {modelo==1 ? "Calcular Capital" : "Calcular Cuota"}
          </button>
        </form>

        {modelo==2 && cuota>0 && (
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

        {modelo==1 && monto>0 && (
          <div className="mt-8 p-6 bg-primary text-white rounded-xl text-center shadow-inner transition-opacity duration-500">
            <p className="text-lg opacity-90">Monto autorizado:</p>
            <p className="text-4xl font-bold text-accent mt-2">
              ${monto.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </p>
            <button className="w-full rounded-lg bg-amber-300 text-black text-center mt-4 p-2 font-bold cursor-pointer hover:bg-amber-400"
              onClick={()=>cargaSolicitud()}
            >
              ¡SOLICITALO YA!</button>
          </div>
        )}
        <p className="mb-3 text-[12px] text-center">Los valores mostrados son aproximados y no constituyen una oferta vinculante. La tasa, cuota y condiciones finales pueden variar según el análisis crediticio y las tasas vigentes al momento de la aprobación.</p>
      </div>
    </section>
  );
}