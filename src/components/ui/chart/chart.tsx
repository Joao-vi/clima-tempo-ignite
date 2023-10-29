import { useChartStore } from './stores/chart-store'
import { ShimmerEffect } from '../shimmer'

import { NoDataMessage } from './no-data-message'
import { useChartInstanceStore } from './stores/chart-instance'
import { useChartToolbox } from './stores/chart-toolbox-store'
import { cn } from '../../utils/tailwind-css'

export const Chart = () => {
  const { isLoading, hasData } = useChartStore()
  const { elementRef } = useChartInstanceStore()
  const { isOpen } = useChartToolbox()

  const shouldHideCart = !isOpen || isLoading || !hasData

  return (
    <article className={cn('relative flex-1', isOpen && 'aspect-video')}>
      {isLoading && <ShimmerEffect className="w-full h-full" />}
      {!isLoading && !hasData && <NoDataMessage />}

      <div
        ref={elementRef}
        style={
          shouldHideCart ? { inset: 0, position: 'absolute', visibility: 'hidden' } : undefined
        }
        className="h-full w-full"
      />
    </article>
  )
}
