'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {ChartContainer} from '@/components/ui/chart'
import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts'

const data = [
  {name: 'Segment 1', value: 50},
  {name: 'Segment 2', value: 30},
  {name: 'Segment 3', value: 20},
]

const COLORS = ['#E6C88C', '#C4A062', '#8B5E3C']

export default function CapitalStructureChart() {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Capital Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            segment1: {
              label: 'Segment 1',
              color: COLORS[0],
            },
            segment2: {
              label: 'Segment 2',
              color: COLORS[1],
            },
            segment3: {
              label: 'Segment 3',
              color: COLORS[2],
            },
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={0}
                outerRadius={140}
                fill='#8884d8'
                paddingAngle={0}
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
