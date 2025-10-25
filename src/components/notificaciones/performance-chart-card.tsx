'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from 'recharts';

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

    const formatValue = (value: number) => {
      if(title.includes("(en Millones COP)")){
        return `$${value}M`;
      }
      return value.toString();
    }
    
    const tooltipFormatter = (value: number) => {
       if(title.includes("(en Millones COP)")){
        return (value * 1000000).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
      }
      return value.toString();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout={layout} margin={{ top: 5, right: 20, left: layout === 'horizontal' ? 20 : -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={layout === 'horizontal'} horizontal={layout === 'vertical'} />
                        {layout === 'horizontal' ? (
                            <>
                                <XAxis type="number" dataKey={dataKey} tickFormatter={formatValue} />
                                <YAxis type="category" dataKey={indexKey} width={80} tick={{fontSize: 12}} />
                            </>
                        ) : (
                            <>
                                <XAxis type="category" dataKey={indexKey} tick={{fontSize: 12}} />
                                <YAxis type="number" tickFormatter={metaKey ? undefined : formatValue} />
                            </>
                        )}
                        <Tooltip 
                            formatter={(value: number) => [tooltipFormatter(value), metaKey ? 'Realizado' : 'Ventas']} 
                            cursor={{ fill: 'hsl(var(--muted))' }}
                        />
                        {!hideLegend && <Legend />}
                        <Bar dataKey={dataKey} name="Realizado" radius={[4, 4, 0, 0]}>
                             <LabelList dataKey={dataKey} position={layout === 'horizontal' ? 'insideRight' : 'top'} formatter={formatValue} fontSize={12} fill="white" />
                             {data.map((entry) => (
                                <Cell key={`cell-${entry[indexKey]}`} fill={metaKey && entry[dataKey] >= entry[metaKey] ? 'hsl(var(--primary))' : (entry.fill || 'hsl(var(--secondary-foreground))')}/>
                             ))}
                        </Bar>
                        {metaKey && (
                            <Bar dataKey={metaKey} name="Meta" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
