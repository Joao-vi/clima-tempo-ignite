import { useRef, useEffect, memo } from 'react'
import { init, ECharts, SetOptionOpts } from 'echarts/core'

import { EChartOptions } from './config'

import isEqual from 'lodash.isequal'

export interface ChartProps {
  option: EChartOptions
  settings?: SetOptionOpts
}

export const Chart = memo(
  (props: ChartProps) => {
    const divRef = useRef<HTMLDivElement>(null)
    const chart = useRef<ECharts | null>(null)

    useEffect(() => {
      if (!divRef.current) return

      chart.current = init(divRef.current)

      return () => chart.current?.dispose()
    }, [])

    useEffect(() => {
      chart.current?.setOption(props.option, props.settings)
    }, [props.option, props.settings])

    return (
      <>
        <button
          onClick={() =>
            chart.current?.dispatchAction({
              type: 'restore',
            })
          }
        >
          reset
        </button>

        <div
          ref={divRef}
          style={{ width: 700, height: 500 }}
        />
      </>
    )
  },
  (prev, next) =>
    isEqual(
      { series: prev.option.series, x: prev.option.xAxis },
      { series: next.option.series, x: next.option.xAxis }
    )
)

Chart.displayName = 'Chart'
