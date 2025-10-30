'use client'
import { PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MoreHorizontal, ArrowUp } from 'lucide-react'
import { responseTimeData } from '@/lib/data/indicadores-data'
import { cn } from '@/lib/utils'

const GaugeChart = () => {
  const { value, totalSegments, activeSegments } = responseTimeData.chart
  const data = Array.from({ length: totalSegments }, (_, i) => ({
    name: `Segment ${i + 1}`,
    value: 1,
    color: i < activeSegments ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
  }))

  return (
    <div className='relative flex items-center justify-center h-40 w-full'>
      <PieChart width={300} height={160}>
        <Pie
          data={data}
          cx='50%'
          cy='100%'
          startAngle={180}
          endAngle={0}
          innerRadius='70%'
          outerRadius='100%'
          dataKey='value'
          stroke='hsl(var(--card))'
          strokeWidth={2}
          paddingAngle={4}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={4} />
          ))}
        </Pie>
      </PieChart>
      <div className='absolute flex flex-col items-center justify-center' style={{ top: '30%' }}>
        <span className='text-5xl font-bold'>{value}</span>
        <span className='text-sm text-muted-foreground mt-1'>Respuesta promedio</span>
      </div>
    </div>
  )
}

export function ResponseTimeChart() {
  const { title, trend } = responseTimeData
  return (
    <Card className='col-span-1'>
      <CardHeader className='flex-row items-center justify-between pb-4'>
        <CardTitle className='text-base font-semibold'>{title}</CardTitle>
        <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='p-0 flex items-center justify-center'>
        <GaugeChart />
      </CardContent>
      <CardFooter className='flex-col items-center pb-4'>
        <div className='flex items-center gap-2 rounded-md bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600'>
          <ArrowUp className='h-4 w-4' />
          <span>{trend.value}%</span>
          <span className='text-green-600/70'>{trend.label}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
