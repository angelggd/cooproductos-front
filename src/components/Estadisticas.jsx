function Estadisticas() {
   return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <span className="text-xs text-gray-500 font-bold uppercase">Solicitudes Activas</span>
                    <p className="text-2xl font-bold text-primary mt-1">5</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <span className="text-xs text-gray-500 font-bold uppercase">Aprobaciones</span>
                    <p className="text-2xl font-bold text-primary mt-1">12</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <span className="text-xs text-gray-500 font-bold uppercase">Asociados Nuevos</span>
                    <p className="text-2xl font-bold text-primary mt-1">28</p>
                  </div>
                </div>

   )
};

export default Estadisticas;