
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
    average: 4.2,
    trend: 10, // 10% increase from last week (which is bad for response time)
    activities: [
        { name: 'Rápida (<2h)', color: 'bg-green-500', start: 0, span: 3 }, // Starts on day 0 (Mon), spans 3 days
        { name: 'Normal (2-8h)', color: 'bg-yellow-500', start: 2, span: 4 }, // Starts on day 2 (Wed), spans 4 days
        { name: 'Lenta (>8h)', color: 'bg-red-500', start: 5, span: 2 }, // Starts on day 5 (Sat), spans 2 days
    ]
};
