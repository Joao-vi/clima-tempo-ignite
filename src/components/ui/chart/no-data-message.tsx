import { Database } from '@phosphor-icons/react'

export const NoDataMessage = () => (
  <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
    <Database
      className="text-blue-500 text-5xl"
      weight="bold"
    />
    <span className="text-zinc-400">Sem dados para apresentar</span>
  </div>
)
