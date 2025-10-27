
import { Clock, TrendingUp, TrendingDown, FileCheck } from 'lucide-react';

export const salesByAdvisorData = [
    { name: 'Carlos Ruiz', sales: 120000000 },
    { name: 'Ana Gómez', sales: 95000000 },
    { name: 'Luisa Fernández', sales: 75000000 },
    { name: 'Jorge Arias', sales: 50000000 },
];

export const salesByCityData = [
    { name: 'Montería', sales: 210000000 },
    { name: 'Sincelejo', sales: 150000000 },
    { name: 'Barranquilla', sales: 90000000 },
    { name: 'Otros', sales: 45000000 },
];

export const rejectionReasonsData = [
  { name: 'Precio', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Tiempo', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Contrató con otro', value: 300, color: 'hsl(var(--chart-3))' },
  { name: 'Falta de interés', value: 200, color: 'hsl(var(--chart-4))' },
  { name: 'Otro', value: 100, color: 'hsl(var(--muted))' },
];

export const advisorGoalsData = [
  { name: 'Carlos R. (Nuevo)', presented: 4, goal: 5 },
  { name: 'Ana G. (Nuevo)', presented: 8, goal: 10 },
  { name: 'Luisa F. (Antiguo)', presented: 18, goal: 15 },
  { name: 'Jorge A. (Antiguo)', presented: 12, goal: 15 },
];

export const kpisIndicadores = [
    { title: "Tiempo Promedio de Respuesta", value: "3.5", unit: "horas", trend: -5, trendText: "vs la semana pasada", color: "border-blue-500", icon: <Clock className="h-6 w-6" /> },
    { title: "Tiempo Promedio de Conversión", value: "21", unit: "días", trend: 2, trendText: "vs el mes pasado", color: "border-yellow-500", icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Ofertas Presentadas vs Vencidas", value: "82 / 18", chartData: [{value: 82, color: 'hsl(var(--primary))'}, {value: 18, color: 'hsl(var(--destructive))'}], color: "border-green-500", icon: <FileCheck className="h-6 w-6" /> },
    { title: "Tasa de Rechazo", value: "15.2", unit: "%", trend: -1.5, trendText: "vs el mes pasado", color: "border-red-500", icon: <TrendingDown className="h-6 w-6" /> }
];
