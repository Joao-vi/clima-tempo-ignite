import { CanvasRenderer } from 'echarts/renderers'
import { use, ComposeOption } from 'echarts/core'
import { LineChart, LineSeriesOption } from 'echarts/charts'

import {
  LegendComponent,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponentOption,
} from 'echarts/components'
import { LegendOption } from 'echarts/types/dist/shared'

export const setup = () =>
  use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    DataZoomComponent,
    LegendComponent,
  ])

export type EChartOptions = ComposeOption<LineSeriesOption | GridComponentOption | LegendOption>
