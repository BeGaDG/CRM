
export const kpisData = [
    { title: 'Leads Captados (30d)', value: '316', variationPercent: 12, comparisonText: 'vs el mes anterior' },
    { title: 'Tasa de Conversión', value: '15.8%', variationPercent: -2.5, comparisonText: 'vs el mes anterior' },
    { title: 'Facturación Total (30d)', value: '$89.4M', variationPercent: 20.1, comparisonText: 'vs el mes anterior' },
    { title: 'Clientes Activos', value: '78', variationPercent: 5, comparisonText: 'vs el mes anterior' }
];

export const insightsData = [
    { title: "Mejor Sede en Conversión", description: "Los leads de Montería tienen una tasa de conversión 12% más alta.", trend: "positive" as const },
    { title: "Asesor del Mes", description: "El asesor con mejor rendimiento del mes es Carlos Ruiz.", trend: "positive" as const },
    { title: "Oportunidad de Mejora", description: "El 40% de los contratos se generan tras la segunda cotización.", trend: "neutral" as const }
];

export const reportData = [
  { id: 'lead-1', lead_name: 'Constructora S.A.S', assigned_to: 'Carlos Ruiz', status: 'Contratado', last_update: '2024-07-28', value: 120000000, sede: 'Montería' },
  { id: 'lead-2', lead_name: 'Inversiones XYZ', assigned_to: 'Ana Gómez', status: 'Cotizado', last_update: '2024-07-27', value: 15000000, sede: 'Sincelejo' },
  { id: 'lead-3', lead_name: 'Logística Total', assigned_to: 'Carlos Ruiz', status: 'Visitado', last_update: '2024-07-25', value: 0, sede: 'Montería' },
  { id: 'lead-4', lead_name: 'Nuevo Cliente Alfa', assigned_to: 'Luisa Fernández', status: 'Contactado', last_update: '2024-07-28', value: 0, sede: 'Otros' },
  { id: 'lead-5', lead_name: 'Tiendas La Rebaja', assigned_to: 'Ana Gómez', status: 'Contratado', last_update: '2024-07-22', value: 85000000, sede: 'Sincelejo' },
];

export const statusColors: { [key: string]: string } = {
  Contratado: 'bg-green-100 text-green-800',
  Cotizado: 'bg-blue-100 text-blue-800',
  Visitado: 'bg-purple-100 text-purple-800',
  Contactado: 'bg-yellow-100 text-yellow-800',
  Nuevo: 'bg-gray-100 text-gray-800',
};
