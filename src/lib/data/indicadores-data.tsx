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

export const responseTimeData = {
    value: 3.8,
    min: 0,
    max: 12,
    segments: [
        { min: 0, max: 3, color: '#22c55e' }, // Verde
        { min: 3, max: 6, color: '#facc15' }, // Amarillo
        { min: 6, max: 9, color: '#f97316' }, // Naranja
        { min: 9, max: 12, color: '#ef4444' }, // Rojo
    ]
}
