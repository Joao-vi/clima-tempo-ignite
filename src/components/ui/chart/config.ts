import { CanvasRenderer } from 'echarts/renderers'
import { use, ComposeOption, registerTheme } from 'echarts/core'
import { LineChart, LineSeriesOption } from 'echarts/charts'

import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  DataZoomComponentOption,
  TooltipComponentOption,
} from 'echarts/components'

import theme from './theme.json'

export const setup = () => {
  console.warn('foi')
  use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    DataZoomComponent,
    ToolboxComponent,
  ])
  registerTheme('default', theme)
}

export type EChartOptions = ComposeOption<
  | LineSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | DataZoomComponentOption
>

export const defaultConfig: EChartOptions = {
  dataZoom: {
    type: 'inside',
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '5%',
    right: '3%',
    bottom: '10%',
    left: '6%',
  },
}
