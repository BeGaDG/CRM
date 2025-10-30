
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

export const offersData = {
    total: 350,
    presentadas: 245,
    vencidas: 105,
    chartData: [
        { month: 'Ene', presentadas: 45, vencidas: 20 },
        { month: 'Feb', presentadas: 50, vencidas: 25 },
        { month: 'Mar', presentadas: 60, vencidas: 30 },
        { month: 'Abr', presentadas: 55, vencidas: 28 },
        { month: 'May', presentadas: 70, vencidas: 35 },
        { month: 'Jun', presentadas: 65, vencidas: 32 },
        { month: 'Jul', presentadas: 75, vencidas: 40 },
        { month: 'Aug', presentadas: 80, vencidas: 42 },
    ],
};


export const rejectionData = {
    totalRejections: 105,
    reasons: [
        { name: 'Precio', value: 42, count: 44, color: 'hsl(var(--chart-2))' },
        { name: 'Falta de Interés', value: 25, count: 26, color: 'hsl(var(--chart-3))' },
        { name: 'Otro Proveedor', value: 23, count: 24, color: 'hsl(var(--chart-4))' },
        { name: 'Tiempo', value: 10, count: 11, color: 'hsl(var(--chart-5))' },
    ]
};

export const salesByCityData = [
  { month: 'Ene', sales: 2800 },
  { month: 'Feb', sales: 2900 },
  { month: 'Mar', sales: 3200 },
  { month: 'Abr', sales: 3100 },
  { month: 'May', sales: 3500 },
  { month: 'Jun', sales: 3800 },
  { month: 'Jul', sales: 3700 },
  { month: 'Ago', sales: 4200 },
  { month: 'Sep', sales: 3900 },
  { month: 'Oct', sales: 3600 },
  { month: 'Nov', sales: 4500 },
  { month: 'Dic', sales: 4800 },
];
