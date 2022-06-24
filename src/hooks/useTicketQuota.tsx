import { useEffect, useState } from 'react'
import { TicketQuota } from 'types/TicketQuota'
import { useInterval } from './useInterval'

export function useTicketQuota(interval: number = 10000) {
  const [availability, setAvailability] = useState<TicketQuota | undefined>(undefined)

  useEffect(() => {
    async function asyncEffect() {
      await trySetQuota()
    }

    asyncEffect()
  }, [])

  useInterval(async () => {
    await trySetQuota()
  }, interval)

  async function trySetQuota() {
    try {
      const response = await fetch('/api/tickets/availability')
      const body = await response.json()
      setAvailability(body.data)
      return
    } catch (e) {
      console.log('Unable to fetch availability')
    }
  }

  return availability
}
