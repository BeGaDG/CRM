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

const CustomTooltip = ({ active, payload, label, title }: any) => {
    if (active && payload && payload.length) {
        const formatCurrency = (value: number) => (value * 1000000).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
        const isCurrency = title.includes("(en Millones COP)");
        
        const pld = payload[0];
        const { totalSales, sales } = pld.payload;
        const percentage = totalSales && sales ? ((sales / totalSales) * 100).toFixed(1) : null;

        return (
            <div className="p-3 bg-card border rounded-lg shadow-lg text-sm text-card-foreground">
                <p className="font-bold mb-2">{label}</p>
                 <div style={{ color: pld.fill }} className="font-medium">
                    {pld.name}: {isCurrency ? formatCurrency(pld.value) : pld.value}
                    {percentage && <span className='ml-2 text-muted-foreground'>({percentage}%)</span>}
                </div>
                 {payload.length > 1 && (
                    <div style={{ color: payload[1].fill }} className="font-medium">
                        {payload[1].name}: {isCurrency ? formatCurrency(payload[1].value) : payload[1].value}
                    </div>
                 )}
            </div>
        );
    }
    return null;
};

export const PerformanceChartCard = ({ title, description, data, dataKey, indexKey, metaKey, layout = 'vertical', hideLegend = false }: PerformanceChartCardProps) => {

    const formatValue = (value: number) => {
      if(title.includes("(en Millones COP)")){
        return `$${value}M`;
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
                    <BarChart data={data} layout={layout} margin={{ top: 5, right: 30, left: layout === 'horizontal' ? 20 : -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={layout === 'horizontal'} horizontal={layout === 'vertical'} />
                        {layout === 'horizontal' ? (
                            <>
                                <XAxis type="number" dataKey={dataKey} tickFormatter={formatValue} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis type="category" dataKey={indexKey} width={80} tick={{fontSize: 12}} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                            </>
                        ) : (
                            <>
                                <XAxis type="category" dataKey={indexKey} tick={{fontSize: 12}} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                                <YAxis type="number" tickFormatter={metaKey ? undefined : formatValue} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            </>
                        )}
                        <Tooltip 
                            content={<CustomTooltip title={title}/>}
                            cursor={{ fill: 'hsl(var(--accent))' }}
                        />
                        {!hideLegend && <Legend wrapperStyle={{fontSize: "0.8rem"}}/>}
                        {metaKey && (
                            <Bar dataKey={metaKey} name="Meta" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                        )}
                        <Bar dataKey={dataKey} name={metaKey ? 'Realizado' : 'Ventas'} radius={[4, 4, 0, 0]}>
                             <LabelList dataKey={dataKey} position={layout === 'horizontal' ? 'right' : 'top'} formatter={formatValue} fontSize={12} fill="hsl(var(--foreground))" offset={layout === 'horizontal' ? 5 : 0} />
                             {data.map((entry) => {
                                 const isGoalMet = metaKey ? entry[dataKey] >= entry[metaKey] : true;
                                 const primaryColor = `hsl(var(--primary))`;
                                 const secondaryColor = `hsl(var(--chart-2))`;
                                 const defaultFill = entry.fill || secondaryColor;
                                 const fillColor = metaKey ? (isGoalMet ? primaryColor : secondaryColor) : defaultFill;
                                return <Cell key={`cell-${entry[indexKey]}`} fill={fillColor}/>
                             })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
