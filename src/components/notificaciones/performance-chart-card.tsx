'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

type PerformanceChartCardProps = {
    title: string;
    description: string;
    data: any[];
    dataKey: string;
    indexKey: string;
    metaKey?: string;
    layout?: 'horizontal' | 'vertical';
    hideLegend?: boolean;
};

export const PerformanceChartCard = ({ title, description, data, dataKey, indexKey, metaKey, layout = 'vertical', hideLegend = false }: PerformanceChartCardProps) => {

    const formatMillions = (value: number) => `$${value}M`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout={layout} margin={{ top: 5, right: 20, left: layout === 'horizontal' ? 20 : -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        {layout === 'horizontal' ? (
                            <>
                                <XAxis type="number" dataKey={dataKey} tickFormatter={formatMillions} />
                                <YAxis type="category" dataKey={indexKey} width={80} />
                            </>
                        ) : (
                            <>
                                <XAxis type="category" dataKey={indexKey} />
                                <YAxis type="number" dataKey={dataKey} tickFormatter={formatMillions} />
                            </>
                        )}
                        <Tooltip formatter={(value: number) => [value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }), 'Valor']} />
                        {!hideLegend && <Legend />}
                        <Bar dataKey={dataKey} name="Realizado" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                             <LabelList dataKey={dataKey} position={layout === 'horizontal' ? 'right' : 'top'} formatter={formatMillions} fontSize={12} />
                        </Bar>
                        {metaKey && (
                            <Bar dataKey={metaKey} name="Meta" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]}>
                                <LabelList dataKey={metaKey} position={layout === 'horizontal' ? 'right' : 'top'} formatter={formatMillions} fontSize={12} />
                            </Bar>
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};