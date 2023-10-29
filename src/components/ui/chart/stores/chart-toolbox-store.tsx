import { ReactNode, createContext, useContext, useMemo, useReducer } from 'react'
import { useChartInstanceStore } from './chart-instance'

type ContextProps = {
  isOpen: boolean
  exportPNG(fileName: string): void
  toggle(): void
  resetZoom(): void
  exportCSV(): void
}

const Context = createContext<ContextProps | null>(null)

type ChartStoreProviderProps = {
  children: ReactNode
}

const ChartToolboxStoreProvider = (props: ChartStoreProviderProps) => {
  const { getInstance } = useChartInstanceStore()

  const [isOpen, toggle] = useReducer((state) => !state, true)

  const exportPNG = (fileName: string) => {
    const url = getInstance()?.getDataURL({ pixelRatio: 5, backgroundColor: 'white' })
    if (!url) return
  }

  const exportCSV = () => {
    // implement
  }

  const resetZoom = () =>
    getInstance()?.dispatchAction({
      type: 'restore',
    })

  const value = useMemo(
    () => ({
      isOpen,
      toggle,
      exportPNG,
      exportCSV,
      resetZoom,
    }),
    [isOpen]
  )

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

const useChartToolbox = () => {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('ChartToolboxStoreProvider was not found')

  return ctx
}

export { ChartToolboxStoreProvider, useChartToolbox }
