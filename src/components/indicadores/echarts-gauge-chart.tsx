'use client';
import ReactECharts from 'echarts-for-react';

export const EchartsGaugeChart = ({ value }: { value: number }) => {

  const option = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 18,
          itemStyle: {
            color: 'hsl(var(--primary))',
          }
        },
        axisLine: {
          lineStyle: {
            width: 18,
            color: [[1, 'hsl(var(--muted))']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 32,
          color: 'hsl(var(--foreground))',
          offsetCenter: [0, '0%'],
          formatter: function (value: number) {
            return value + 'min';
          }
        },
        data: [
          {
            value: value
          }
        ],
        min: 0,
        max: 60,
      }
    ]
  };
  
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge={true} lazyUpdate={true} />;
};
