import { useState } from 'react';

export default function CreditSimulator() {
  const [monto, setMonto] = useState('');
  const [meses, setMeses] = useState(12);
  const [cuota, setCuota] = useState(null);

  const calcularCredito = (e) => {
    e.preventDefault();
    const capital = parseFloat(monto);
    if (!capital || capital <= 0) return;

    // Tasa de interés mensual simulada del 1.5%
    const tasa = 0.015; 
    
    // Lógica de cuota fija
    const cuotaMensual = (capital * tasa) / (1 - Math.pow(1 + tasa, -meses));
    setCuota(cuotaMensual);
  };

  return (
    <section id="simulador" className="py-16 bg-background">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-3xl font-bold text-primary text-center mb-6">Simula tu Crédito</h3>
        
        <form onSubmit={calcularCredito} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Monto Solicitado ($)</label>
            <input 
              type="number" 
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all"
              placeholder="Ej. 5000000"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Plazo (Meses)</label>
            <input 
              type="range" 
              min="6" max="60" step="6"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
              className="w-full accent-accent"
            />
            <div className="text-center text-primary font-bold mt-2">{meses} meses</div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md">
            Calcular Cuota
          </button>
        </form>

        {cuota && (
          <div className="mt-8 p-6 bg-primary text-white rounded-xl text-center shadow-inner transition-opacity duration-500">
            <p className="text-lg opacity-90">Tu cuota mensual aproximada será:</p>
            <p className="text-4xl font-bold text-accent mt-2">
              ${cuota.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}