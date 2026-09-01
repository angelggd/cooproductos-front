import { useState, useEffect } from 'react';
import { getTasaByPeriodo } from '../services/srvCreditos';
import { toast } from "react-toastify";

export default function CreditSimulator() {
  const [monto, setMonto] = useState(null);
  const [meses, setMeses] = useState(10);
  const [cuota, setCuota] = useState(0);
  const [tasaAnual, setTasaAnual] = useState(0.00);
  const [tasa, setTasa] = useState(0.000000);

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


  const calcularCredito = async(e) => {
      e.preventDefault();
      const cuotaM = parseFloat(cuota);
      if (!cuotaM || cuotaM <= 0) return;
      const xtasa=Number(tasa)/100;
      let vp1=cuotaM*((1+Number(xtasa))**meses-1);
      let vp2=(Number(xtasa)*(1+Number(xtasa))**meses);
      const vpresente=vp1/vp2;
      const aval = vpresente*32/100;
      const tmonto = parseFloat(vpresente-aval);
      setMonto(tmonto);
  
  };

  return (
    <section id="simulador" className="py-16 bg-background">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-3xl font-bold text-primary text-center mb-6">Simula tu Crédito</h3>
        
        <form onSubmit={calcularCredito} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cuota Mensual Disponible ($)</label>
            <input 
              type="number" 
              value={cuota}
              onChange={(e) => setCuota(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all"
              placeholder="Ej. 500000"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Plazo (Meses)</label>
            <input 
              type="range" 
              min="2" max="60" step="2"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
              className="w-full accent-accent"
            />
            <div className="text-center text-primary font-bold mt-2">{meses} meses</div>
            <div className="text-center text-primary font-bold mt-2">Tasa : {tasa}%</div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md">
            Calcular Capital
          </button>
        </form>

        {monto && (
          <div className="mt-8 p-6 bg-primary text-white rounded-xl text-center shadow-inner transition-opacity duration-500">
            <p className="text-lg opacity-90">Monto autorizado:</p>
            <p className="text-4xl font-bold text-accent mt-2">
              ${monto.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}