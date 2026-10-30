import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreditProducts() {
  // Pestaña activa para alternar entre las Líneas y los Convenios/Requisitos
  const [activeTab, setActiveTab] = useState('lineas');

  // Las 3 líneas de crédito solicitadas bajo la modalidad de Libranza
  const creditLines = [
    {
      id: 'libre-inversion',
      title: 'Libre Inversión',
      tag: 'Más Solicitado',
      featured: true,
      amount: 'Hasta $10.000.000',
      term: '12 a 60 meses',
      rate: '2.1% M.V.',
      description: 'Financiación de libre destinación con cuota fija descontada directamente de tu nómina. Sin trámites engorrosos.',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      highlights: ['Descuento automático por nómina', 'Sin afectar tu flujo de caja', 'Aprobación ágil']
    },
    {
      id: 'retanqueo',
      title: 'Retanqueo de Crédito',
      tag: 'Renovación Rápida',
      featured: false,
      amount: 'Cupo adicional según saldo',
      term: 'Hasta 60 meses',
      rate: '2.1% M.V.',
      description: 'Si ya cuentas con un crédito activo, renueva tu cupo disponible de manera inmediata y mantén una cuota cómoda.',
      icon: (
        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      highlights: ['Recoge saldos anteriores', 'Liquidez inmediata', 'Mantiene beneficios de nómina']
    },
    {
      id: 'compra-cartera',
      title: 'Compra de Cartera',
      tag: 'Unifica tus Deudas',
      featured: false,
      amount: 'Inferiores a $5.000.000',
      term: '12 a 60 meses',
      rate: '2.1% M.V.',
      description: 'Consolida tus obligaciones financieras externas en una sola cuota mensual con una tasa preferencial por libranza.',
      icon: (
        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      ),
      highlights: ['Montos menores a $5.000.000', 'Mejora tu capacidad de pago', 'Un solo descuento mensual']
    }
  ];

  // Convenios institucionales
  const convenios = [
    { title: 'Secretaría de Educación Municipal de Sincelejo', location: 'Sucre', active: true },
    { title: 'Secretaría de Educación Municipal de Valledupar', location: 'Cesar', active: true },
    { title: 'Secretaría de Educación del Magdalena', location: 'Magdalena', active: true },
    { title: 'Secretaría de Educación de Monteria', location: 'Monteria', active: true },
  ];

  // Segmento docente atendido
  const segmentos = [
    { label: 'Docentes activos vinculados al magisterio en propiedad', desc: 'Nombramiento en firme con estabilidad laboral' },
    { label: 'Provisional en vacante definitiva', desc: 'Vinculación activa con certificación vigente' },
    { label: 'Provisional en vacante temporal', desc: 'Sujeto a vigencia y tiempo de la novedad' },
    { label: 'Docentes en periodo de prueba', desc: 'Acceso especial a líneas de libranza iniciales' },
  ];

  return (
    <section id="productos" className="py-20 bg-background relative overflow-hidden">
      {/* Círculos decorativos con la paleta verde */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Cabecera Principal */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-bold tracking-widest uppercase bg-accent/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Modalidades de Crédito por Libranza
          </span>
          <h2 className="text-3xl font-bold text-primary tracking-tight mb-4">
            Crédito para Docentes y Sector Educación
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Descuento directo por nómina con cuota fija mensual, aprobación ágil y sin complicaciones para el magisterio.
          </p>
        </div>

        {/* Banner de Condiciones Clave (Destacados de la Libranza) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Monto Máximo</span>
            <span className="text-xl sm:text-2xl font-extrabold text-primary mt-1">Hasta $10M</span>
            <span className="text-[11px] text-gray-500 mt-0.5">Te prestamos hasta $10.000.000</span>
          </div>

{/*           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tasa de Interés</span>
            <span className="text-xl sm:text-2xl font-extrabold text-accent mt-1">2.1% M.V.</span>
            <span className="text-[11px] text-gray-500 mt-0.5">Tasa preferencial fija</span>
          </div> */}

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Plazo Flexible</span>
            <span className="text-xl sm:text-2xl font-extrabold text-primary mt-1">12 a 60 Meses</span>
            <span className="text-[11px] text-gray-500 mt-0.5">Mínimo 1 año, máx. 5 años</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Edad de Cobertura</span>
            <span className="text-xl sm:text-2xl font-extrabold text-secondary mt-1">Hasta 85 Años</span>
            <span className="text-[11px] text-gray-500 mt-0.5">Amplitud de edad para asociados</span>
          </div>
        </div>

        {/* Selector de Pestañas UX: Líneas de Crédito vs Convenios y Requisitos */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl border border-gray-200/80 shadow-xs inline-flex gap-1.5">
            <button
              onClick={() => setActiveTab('lineas')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'lineas'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Líneas Disponibles
            </button>
            <button
              onClick={() => setActiveTab('convenios')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'convenios'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Convenios y Segmento Atendido
            </button>
          </div>
        </div>

        {/* Contenido Dinámico según la Pestaña */}
        <AnimatePresence mode="wait">
          {activeTab === 'lineas' ? (
            /* Vista 1: Cuadrícula de Líneas de Crédito */
            <motion.div
              key="lineas-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {creditLines.map((prod) => (
                <div
                  key={prod.id}
                  className={`bg-white rounded-3xl p-7 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    prod.featured
                      ? 'border-accent shadow-md ring-2 ring-accent/20 relative'
                      : 'border-gray-200/80 hover:border-secondary/40 shadow-xs'
                  }`}
                >
                  {/* Encabezado de la Tarjeta */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                        {prod.icon}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        prod.featured
                          ? 'bg-accent text-white shadow-xs'
                          : 'bg-secondary/10 text-secondary'
                      }`}>
                        {prod.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-2">
                      {prod.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {prod.description}
                    </p>

                    {/* Especificaciones clave */}
                    <div className="p-4 bg-background rounded-2xl mb-6 space-y-2 border border-gray-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold uppercase">Monto</span>
                        <span className="font-bold text-primary">{prod.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold uppercase">Plazo</span>
                        <span className="font-bold text-primary">{prod.term}</span>
                      </div>
             {/*          <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold uppercase">Tasa</span>
                        <span className="font-bold text-accent">{prod.rate}</span>
                      </div> */}
                    </div>

                    {/* Ventajas */}
                    <ul className="space-y-2 mb-6 text-xs text-gray-500">
                      {prod.highlights.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA al Simulador */}
                  <a
                    href="#simulador"
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                      prod.featured
                        ? 'bg-accent hover:bg-secondary text-white shadow-md'
                        : 'bg-primary hover:bg-secondary text-white shadow-xs'
                    }`}
                  >
                    <span>Simular Esta Línea</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </motion.div>
          ) : (
            /* Vista 2: Convenios Activos y Segmento Atendido */
            <motion.div
              key="convenios-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Columna Izquierda: Secretarías en Convenio */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Convenios Activos</h3>
                    <p className="text-xs text-gray-500">Secretarías de educación habilitadas para descuento por nómina</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {convenios.map((c, idx) => (
                    <div key={idx} className="p-4 bg-background rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                        <div>
                          <p className="text-sm font-bold text-primary">{c.title}</p>
                          <span className="text-[11px] text-gray-400 font-medium">Departamento / Municipio: {c.location}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                        Convenio Vigente
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-accent/5 rounded-2xl border border-accent/20 flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong className="text-primary font-semibold">Requisito principal:</strong> Debes ser empleado del segmento de educación con convenio activo en alguna de estas secretarías.
                  </p>
                </div>
              </div>

              {/* Columna Derecha: Segmento Docente Atendido */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Segmento Atendido</h3>
                    <p className="text-xs text-gray-500">Docentes y directivos docentes con vinculación válida</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {segmentos.map((s, idx) => (
                    <div key={idx} className="p-4 bg-background rounded-2xl border border-gray-100 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{s.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20 flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    <span className="block font-bold text-primary">¿No sabes si tu nombramiento aplica?</span>
                    <span className="text-[11px] text-gray-500">Un asesor validará tu desprendible de nómina en minutos.</span>
                  </div>
                  <a
                    href="#contacto"
                    className="px-3.5 py-2 bg-secondary text-white text-xs font-bold rounded-xl hover:bg-primary transition-colors shrink-0 ml-2"
                  >
                    Asesoría
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nota legal y confirmación al pie */}
        <div className="mt-12 text-center text-xs text-gray-500 max-w-xl mx-auto">
          * Aprobación sujeta a estudio crediticio y capacidad de endeudamiento sobre el desprendible de pago. Cuota fija descontada por nómina según convenio activo.
        </div>

      </div>
    </section>
  );
}