import { graphic } from 'echarts/core'

import ignite from './mocks/ignite/forecast.json'
import climaTempo from './mocks/clima-tempo/forecast.json'

import { Chart } from './components/ui/chart'

const getIgniteData = (data: any) => ({
  x: Object.keys(data) as any,
  data: Object.values(data) as any,
})

const getClimaTempoData = (data: any) => ({ x: data.data.map((i) => i.date), data: data.data })

const igniteData = getIgniteData(ignite)
const climaTempoData = getClimaTempoData(climaTempo)

console.log(climaTempoData)

function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <h1>Cidade: Piracaia</h1>

      <Chart.Root
        className="w-[700px] h-[500px]"
        isLoading={false}
        hasData
        option={{
          legend: {},
          series: [
            {
              type: 'line',
              name: 'Chuva - Ignite',
              data: igniteData.data.map((i) => i.daily.rainfall),
              smooth: 1,
              areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#3b82f6',
                  },
                  {
                    offset: 1,
                    color: '#bfdbfe',
                  },
                ]),
              },

              lineStyle: {
                width: 4,
                color: '#3b82f6',
              },
            },
            {
              type: 'line',
              name: 'Chuva - Clima tempo',
              data: climaTempoData.data.map((i) => i.rain.precipitation),
              smooth: 1,
              areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#3b8',
                  },
                  {
                    offset: 1,
                    color: '#33bb8940',
                  },
                ]),
              },

              lineStyle: {
                width: 4,
                color: '#3b8',
              },
            },
          ],
          xAxis: {
            type: 'category',
            data: igniteData.x.map((i) => DateUtils.getLocalDayMonthHourMinutesString(i)),
            axisLine: {
              lineStyle: {
                color: '#a1a1aa',
              },
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#e4e4e7',
              },
            },
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#e4e4e7',
                type: 'dashed',
              },
            },
          },
          dataZoom: {
            type: 'inside',
          },
          tooltip: {
            trigger: 'axis',
            valueFormatter: (value) => value.toFixed(2) + 'mm',
          },
          textStyle: {
            color: '#3f3f46',
            fontWeight: 500,
            fontFamily: 'Poppins',
            fontSize: 14,
          },
          grid: {
            top: '5%',
            bottom: '5%',
            left: '5%',
            right: '5%',
            width: 'auto',
            height: 'auto',
          },
        }}
      >
        <Chart.Content />
      </Chart.Root>
    </div>
  )
}

export class DateUtils {
  static toViewDate(date: string | Date) {
    const _date = this.getSafeDate(date)

    return _date.toLocaleDateString('pt-br', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  private static getSafeDate(date: string | Date): Date {
    return date instanceof Date ? date : new Date(date)
  }

  static getLocalDayMonthHourMinutesString(date: string | Date): string {
    return (
      this.getSafeDate(date).toLocaleString('pt-br', {
        day: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }) + 'h'
    )
  }
}

export default App
