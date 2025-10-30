'use client'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const GaugeChart = ({ value, min, max }: { value: number, min: number, max: number }) => {
  const percentage = (value - min) / (max - min)
  const endAngle = 180 - percentage * 180
  
  const data = [{ value: 1 }]

  return (
    <div className='relative w-full h-[180px]'>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--card))"
            strokeWidth={4}
          />
          {/* Value arc */}
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={endAngle}
            innerRadius="70%"
            outerRadius="100%"
            fill="url(#gaugeGradient)"
            stroke="hsl(var(--card))"
            strokeWidth={4}
            cornerRadius={8}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute inset-0 flex flex-col items-center justify-end pointer-events-none'>
        <span className='text-6xl font-bold text-foreground'>{value.toFixed(1)}h</span>
        <span className='text-sm text-muted-foreground'>Respuesta Promedio</span>
      </div>
      <div className="absolute bottom-[20px] w-full px-4 flex justify-between text-xs text-muted-foreground">
        <span>{min}h</span>
        <span>{max}h+</span>
      </div>
    </div>
  )
}

export function ResponseTimeChart() {
  // Example data
  const responseTime = 3.8
  const minTime = 0
  const maxTime = 12

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-center">
          Tiempo de Respuesta a Nuevos Leads
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <GaugeChart value={responseTime} min={minTime} max={maxTime} />
      </CardContent>
    </Card>
  )
}
