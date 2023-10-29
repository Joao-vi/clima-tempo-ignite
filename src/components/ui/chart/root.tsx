import { ComponentProps, useMemo } from 'react'

import { ChartStoreProvider } from './stores/chart-store'
import { ChartInstanceStoreProvider } from './stores/chart-instance'
import { ChartToolboxStoreProvider } from './stores/chart-toolbox-store'
import { EChartOptions } from './config'
import { cn } from '../../utils/tailwind-css'

type RootProps = {
  isLoading: boolean
  hasData: boolean
  option: EChartOptions
} & ComponentProps<'div'>

export const Root = ({ isLoading, hasData, className, option, ...rest }: RootProps) => {
  return (
    <ChartInstanceStoreProvider option={option}>
      <ChartToolboxStoreProvider>
        <ChartStoreProvider value={useMemo(() => ({ isLoading, hasData }), [isLoading, hasData])}>
          <div
            className={cn(
              'flex flex-col gap-2 border border-zinc-200 shadow-sm rounded-md p-3',
              className
            )}
            {...rest}
          />
        </ChartStoreProvider>
      </ChartToolboxStoreProvider>
    </ChartInstanceStoreProvider>
  )
}
