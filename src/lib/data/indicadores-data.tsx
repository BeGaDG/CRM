
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
    currentTime: 3.2, // Tiempo actual en horas
    maxTime: 8,       // Tiempo objetivo en horas
};

export const offersData = {
    total: 12875,
    productSales: 7213,
    subscriptions: 5662,
    chartData: [
        { month: 'Jan', product: 300, subs: 400 },
        { month: 'Feb', product: 200, subs: 300 },
        { month: 'Mar', product: 500, subs: 600 },
        { month: 'Apr', product: 400, subs: 500 },
        { month: 'May', product: 700, subs: 800 },
        { month: 'Jun', product: 600, subs: 700 },
        { month: 'Jul', product: 800, subs: 900 },
        { month: 'Aug', product: 700, subs: 800 },
    ],
};

export const rejectionData = {
    average: 1.05,
    reasons: [
        { name: 'Approved', value: 39, count: 410, color: 'hsl(var(--chart-2))' },
        { name: 'Pending', value: 26, count: 142, color: 'hsl(var(--chart-3))' },
        { name: 'Under review', value: 24, count: 340, color: 'hsl(var(--chart-4))' },
        { name: 'Rejected', value: 11, count: 590, color: 'hsl(var(--chart-5))' },
    ]
};

export const salesByCityData = [
  { month: 'Jan', sales: 2800 },
  { month: 'Feb', sales: 2900 },
  { month: 'Mar', sales: 3200 },
  { month: 'Apr', sales: 3100 },
  { month: 'May', sales: 3500 },
  { month: 'Jun', sales: 3800 },
  { month: 'Jul', sales: 3700 },
  { month: 'Aug', sales: 4200 },
  { month: 'Sep', sales: 3900 },
  { month: 'Oct', sales: 3600 },
  { month: 'Nov', sales: 4500 },
  { month: 'Dec', sales: 4800 },
];
