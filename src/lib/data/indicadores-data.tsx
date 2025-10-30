
export const sedes = [
    { id: 'monteria', name: 'Montería' },
    { id: 'sincelejo', name: 'Sincelejo' },
    { id: 'otros', name: 'Otros' },
];

export const asesores = [
    { id: 'user-1', name: 'Carlos Ruiz', sede: 'Montería' },
    { id: 'user-2', name: 'Ana Gómez', sede: 'Sincelejo' },
    { id: 'user-3', name: 'Luisa Fernández', sede: 'Montería' },
    { id: 'user-4', name: 'Jorge Arias', sede: 'Otros' },
    { id: 'user-7', name: 'Sofia Vergara', sede: 'Sincelejo' },
];

export const responseTimeDataSede = {
    average: 3.8,
    target: 4,
    trend: 10,
    performancePercentage: 85,
    performanceText: 'Mejor que el 85% del objetivo de respuesta.',
};


export const weeklyActivityData = {
    totalHours: 32,
    totalMinutes: 45,
    trend: 5, // 5% increase from last week
    activities: [
        { name: 'Llamadas', color: 'bg-blue-500', start: 0, span: 2 },
        { name: 'Visitas', color: 'bg-green-500', start: 1, span: 3 },
        { name: 'Cotizaciones', color: 'bg-orange-500', start: 3, span: 2 },
        { name: 'Seguimiento', color: 'bg-purple-500', start: 2, span: 5 },
        { name: 'Normal', color: 'bg-yellow-500', start: 4, span: 1 },
        { name: 'Lenta', color: 'bg-red-500', start: 5, span: 2 },
        { name: 'Normal', color: 'bg-yellow-500', start: 0, span: 1 },
        { name: 'Lenta', color: 'bg-red-500', start: 6, span: 1 },
    ]
};
