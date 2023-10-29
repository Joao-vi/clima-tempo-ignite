import {
  MutableRefObject,
  ReactNode,
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { bind } from 'size-sensor'
import { init, dispose, getInstanceByDom, ECharts } from 'echarts/core'
import { EChartOptions, defaultConfig } from '../config'

import isEqual from 'lodash.isequal'

type ContextProps = {
  getInstance: () => ECharts | null | undefined
  elementRef: MutableRefObject<HTMLDivElement | null>
  updateChart(options: EChartOptions): void
}

type ChartInstanceStoreProviderProps = {
  option: EChartOptions
  children: ReactNode
}

const Context = createContext<ContextProps | null>(null)

const ChartInstanceStoreProvider = memo(
  (props: ChartInstanceStoreProviderProps) => {
    const elementRef = useRef<HTMLDivElement | null>(null)

    const getInstance = () => elementRef.current && getInstanceByDom(elementRef.current)
    const initInstance = () =>
      new Promise((resolve) => {
        init(elementRef.current, 'default')
        getInstance()?.on('finished', () => resolve(getInstance()))
      })

    const handleInitInstance = async () => {
      try {
        await initInstance()
      } catch (e: any) {
        throw new Error('An error occurred while opening the chart', e)
      }
    }

    const updateChart = (options: EChartOptions) =>
      getInstance()?.setOption(
        {
          ...options,
          ...defaultConfig,
          tooltip: {
            ...options.tooltip,
            ...defaultConfig.tooltip,
          },
        },
        true,
      )

    useEffect(() => {
      handleInitInstance()

      const removeEvent = bind(elementRef.current, () =>
        getInstance()?.resize({ width: 'auto', height: 'auto' }),
      )
      return () => {
        elementRef.current && dispose(elementRef.current)
        removeEvent()
      }
    }, [])

    useEffect(() => {
      updateChart(props.option)
    }, [props.option])

    return (
      <Context.Provider value={{ elementRef, updateChart, getInstance }}>
        {props.children}
      </Context.Provider>
    )
  },
  (prev, next) =>
    isEqual(
      { series: prev.option.series, xAxis: prev.option.xAxis },
      { series: next.option.series, xAxis: next.option.xAxis },
    ),
)

ChartInstanceStoreProvider.displayName = 'ChartInstanceStoreProvider'

const useChartInstanceStore = () => {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('ChartInstanceStoreProvider was not found')

  return ctx
}

export { ChartInstanceStoreProvider, useChartInstanceStore }
