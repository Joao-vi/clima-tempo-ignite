import { ComponentProps } from 'react'
import { cn } from '../../utils/tailwind-css'

export const ShimmerEffect = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div
    {...rest}
    className={cn('bg-zinc-200 rounded-md p-5 animate-pulse', className)}
  />
)
