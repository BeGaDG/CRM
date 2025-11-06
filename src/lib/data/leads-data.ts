
export type Stage = {
  name: string;
  color: string;
}

export type Advisor = {
  id: string;
  name: string;
}

const leadExample = {
  id: 'lead-1',
  name: 'Constructora S.A.S',
  city: 'Bogotá D.C.',
  lastContact: 'Hace 2h',
  interestType: 'planta-solar' as const,
  status: 'Por Visitar',
  phone: '310 123 4567',
  email: 'contacto@constructora.com',
  creationDate: new Date().toISOString(),
  collectedData: {
    'nic': '1234567',
    'consumo': '5000 kWh',
    'valor_cotizacion': 15000000,
    'potencia_pico': '10 kWp'
  },
  advisorId: 'user-1',
  advisorName: 'Carlos Ruiz',
};
export type Lead = typeof leadExample;

export const stages: Stage[] = [
  { name: 'Nuevo Lead', color: 'bg-blue-500' },
  { name: 'Por Contactar', color: 'bg-cyan-500' },
  { name: 'Por Visitar', color: 'bg-teal-500' },
  { name: 'Por Cotizar', color: 'bg-yellow-500' },
  { name: 'Por Presentar Cotización', color: 'bg-amber-500' },
  { name: 'Ajustar Cotización', color: 'bg-orange-500' },
  { name: 'Seguimiento a la Cotización', color: 'bg-lime-500' },
  { name: 'Por Contratar', color: 'bg-emerald-500' },
  { name: 'Recaptura BD', color: 'bg-indigo-500' },
  { name: 'Finalizados', color: 'bg-green-600' },
  { name: 'No', color: 'bg-slate-500' }
];

const today = new Date();
const threeDaysAgo = new Date();
threeDaysAgo.setDate(today.getDate() - 3);

export const advisors: Advisor[] = [
  { id: 'user-1', name: 'Carlos Ruiz' },
  { id: 'user-2', name: 'Ana Gómez' },
  { id: 'user-3', name: 'Luisa Fernández' },
  { id: 'user-4', name: 'Jorge Arias' },
  { id: 'user-5', name: 'Maria Rodriguez' },
];


export const initialLeads: Lead[] = [
  { id: 'lead-1', name: 'Constructora S.A.S', city: 'Bogotá D.C.', lastContact: 'Hace 2h', interestType: 'planta-solar', status: 'Por Visitar', phone: '310 123 4567', email: 'contacto@constructora.com', creationDate: new Date().toISOString(), collectedData: { 'nic': '123456-7', 'consumo': '15000 kWh', 'valor_cotizacion': 0, 'potencia_pico': '' }, advisorId: 'user-1', advisorName: 'Carlos Ruiz' },
  { id: 'lead-2', name: 'Inversiones XYZ', city: 'Medellín', lastContact: 'Ayer', interestType: 'comercializadora', status: 'Por Visitar', phone: '312 987 6543', email: 'gerencia@inversionesxyz.co', creationDate: new Date().toISOString(), collectedData: {}, advisorId: 'user-1', advisorName: 'Carlos Ruiz' },
  { id: 'lead-3', name: 'Logística Total', city: 'Cali', lastContact: 'Hace 3 días', interestType: 'ambos', status: 'Seguimiento a la Cotización', phone: '315 555 8888', email: 'logistica.total@email.com', creationDate: new Date().toISOString(), collectedData: {
    nic: '555888-1',
    consumo: '25000 kWh',
    pago: 12000000,
    operador: 'Celsia',
    comercializador: 'Celsia',
    tension: '13.2 kV',
    market_type: 'no_regulado',
    quote_date: new Date('2024-07-20'),
    valor_cotizacion: 120500000,
    ref_inversor: 'Fronius Symo 20.0-3-M',
    cant_inversores: '5',
    ref_panel: 'Jinko Solar JKM540M-72HL4-V',
    cant_paneles: '180',
    potencia_pico: '97.2 kWp',
    tipo_medidor: 'Bidireccional',
    telemedida: true,
    monitoreo: true,
    follow_up_date: new Date(),
    follow_up_action: 'llamada',
    follow_up_notes: 'Cliente solicitó un descuento adicional. Se está evaluando la posibilidad. Llamar para confirmar.',
    factura_file: 'factura_logistica_total.pdf',
    cotizacion_file: 'cotizacion_v2_logistica.pdf',
    contrato_file: 'borrador_contrato.pdf',
  }, advisorId: 'user-2', advisorName: 'Ana Gómez' },
  { id: 'lead-4', name: 'Nuevo Lead Alfa (Urgente)', city: 'Barranquilla', lastContact: 'Hace 4 días', interestType: 'planta-solar', status: 'Nuevo Lead', phone: '318 111 2233', email: 'alfa@cliente.com', creationDate: threeDaysAgo.toISOString(), collectedData: {}, advisorId: 'user-2', advisorName: 'Ana Gómez' },
  { id: 'lead-5', name: 'Contacto Pendiente Beta', city: 'Cartagena', lastContact: 'Hace 5h', interestType: 'comercializadora', status: 'Por Contactar', phone: '317 444 5566', email: 'beta@contacto.com', creationDate: new Date().toISOString(), collectedData: {}, advisorId: 'user-1', advisorName: 'Carlos Ruiz' },
  { id: 'lead-6', name: 'Cotización Gamma', city: 'Bogotá D.C.', lastContact: 'Hace 2 días', interestType: 'planta-solar', status: 'Por Cotizar', phone: '316 777 8899', email: 'gamma@cotizacion.com', creationDate: new Date().toISOString(), collectedData: {'nic': '987654-3', 'consumo': '8000 kWh'}, advisorId: 'user-3', advisorName: 'Luisa Fernández' },
  { id: 'lead-7', name: 'Presentación Delta', city: 'Medellín', lastContact: 'Hoy', interestType: 'ambos', status: 'Por Presentar Cotización', phone: '319 000 1122', email: 'delta@presentacion.com', creationDate: new Date().toISOString(), collectedData: {'nic': '555444-1', 'consumo': '25000 kWh', 'valor_cotizacion': 120000000, 'potencia_pico': '50kWp' }, advisorId: 'user-3', advisorName: 'Luisa Fernández' },
  { id: 'lead-8', name: 'Contrato Epsilon', city: 'Cali', lastContact: 'Hace 1 semana', interestType: 'comercializadora', status: 'Por Contratar', phone: '314 333 4455', email: 'epsilon@contrato.com', creationDate: new Date().toISOString(), collectedData: {}, advisorId: 'user-4', advisorName: 'Jorge Arias' },
];
