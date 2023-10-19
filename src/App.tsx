import { Chart } from './components/chart'
import { graphic } from 'echarts/core'

import climaTempoRaw from './mocks/clima-tempo.json'
import { useReducer, useState } from 'react'

import jauIgnite from './mocks/ignite/jau.json'
import jauClimaTempo from './mocks/clima-tempo/jau.json'

import kinDiasIgnite from './mocks/ignite/kin-dias.json'
import kinDiasClimaTempo from './mocks/clima-tempo/kin-dias.json'

import saoPedroIgnite from './mocks/ignite/sao-pedro.json'
import saoPedroClimaTempo from './mocks/clima-tempo/sao-pedro.json'

import apmRuralIgnite from './mocks/ignite/apm-rural.json'
import apmRuralClimaTempo from './mocks/clima-tempo/apm-rural.json'

const getIgniteData = (data: any) => ({
  x: Object.keys(data) as any,
  data: Object.values(data) as any,
})

const getClimaTempoData = (data: any) => ({ x: data.data.map((i) => i.date), data: data.data })

const climaTempo = {
  days: climaTempoRaw.data.map((i) => i.date),
  data: climaTempoRaw.data.map((i) => i.rain.precipitation),
}

const stations = {
  jau: {
    ignite: {
      ...getIgniteData(jauIgnite),
    },

    'clima-tempo': {
      ...getClimaTempoData(jauClimaTempo),
    },
  },

  'kin-dias': {
    ignite: {
      ...getIgniteData(kinDiasIgnite),
    },

    'clima-tempo': {
      ...getClimaTempoData(kinDiasClimaTempo),
    },
  },

  'sao-pedro': {
    ignite: {
      ...getIgniteData(saoPedroIgnite),
    },

    'clima-tempo': {
      ...getClimaTempoData(saoPedroClimaTempo),
    },
  },

  'apm-rural': {
    ignite: {
      ...getIgniteData(apmRuralIgnite),
    },

    'clima-tempo': {
      ...getClimaTempoData(apmRuralClimaTempo),
    },
  },
}

function App() {
  const [station, setStation] = useState<'sao-pedro' | 'kin-dias' | 'jau' | 'apm-rural'>(
    'sao-pedro'
  )
  const [_, render] = useReducer((state) => !state, false)

  const currentStation = stations[station]

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
      <select
        onChange={(e) => setStation(e.target.value)}
        value={station}
        name="stations"
        id="stations"
      >
        <option value="sao-pedro">São Pedro</option>
        <option value="kin-dias">Kin dias</option>
        <option value="jau">Jau</option>
        <option value="apm-rural">Apm Rural</option>
      </select>

      <Chart
        option={{
          legend: {},
          series: [
            {
              type: 'line',
              name: 'Chuva - Ignite',
              data: currentStation.ignite.data.map((i) => i.daily?.rainfall || 0),
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
              data: currentStation['clima-tempo'].data.map((i) => i.rain.precipitation || 0),
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
            data: currentStation['clima-tempo'].x.map((i) =>
              DateUtils.getLocalDayMonthHourMinutesString(i)
            ),
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
      />
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
