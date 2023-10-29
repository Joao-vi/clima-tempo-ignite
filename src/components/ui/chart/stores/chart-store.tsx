import { createContext, useContext } from 'react'

type ContextProps = {
  hasData: boolean
  isLoading: boolean
}

const Context = createContext<ContextProps | null>(null)

const ChartStoreProvider = Context.Provider

const useChartStore = () => {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('ChartStoreProvider was not found')

  return ctx
}

export { ChartStoreProvider, useChartStore }
