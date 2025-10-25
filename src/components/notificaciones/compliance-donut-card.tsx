'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Cumplido', value: 85, color: 'hsl(var(--primary))' },
    { name: 'Pendiente', value: 15, color: 'hsl(var(--muted))' },
];

export const ComplianceDonutCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cumplimiento General por Sede</CardTitle>
                <CardDescription>Porcentaje total de cumplimiento de metas en la sede de Montería.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend iconType="circle" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-foreground">
                            85%
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};