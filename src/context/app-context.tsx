import { createContext, useContext, useEffect, useState } from 'react'
import moment, { Moment } from 'moment'

type AppContextProps = {
  children?: any
}

type AppContext = {
  now: null | Moment
}

const Context = createContext<AppContext>({ now: null })

export const useAppContext = () => {
  return useContext(Context)
}

export const AppContext = (props: AppContextProps) => {
  const [currentTime, setCurrentTime] = useState<Moment | null>(null)

  // Sync current time periodically to keep time related functionality up to date
  useEffect(() => {
    const now = process.env.NODE_ENV === 'development' ? moment.utc('2022-10-12') : moment.utc()

    const syncTime = () => setCurrentTime(now)

    const clear = setInterval(() => {
      syncTime()
    }, 1000 * 60)

    syncTime()

    return () => clearInterval(clear)
  }, [])

  return <Context.Provider value={{ now: currentTime }}>{props.children}</Context.Provider>
}
