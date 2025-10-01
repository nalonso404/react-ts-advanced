import { useMemo } from 'react'

export type TimeDifference = {
  hours: number
  minutes: number
}

export const useTimeDifference = (hourIn: string, hourOut: string): TimeDifference => {
  return useMemo(() => {
    if (!hourIn || !hourOut) return { hours: 0, minutes: 0 }

    const [inHours, inMinutes] = hourIn.split(':').map(Number)
    const [outHours, outMinutes] = hourOut.split(':').map(Number)

    const inDate = new Date()
    inDate.setHours(inHours, inMinutes, 0, 0)

    const outDate = new Date()
    outDate.setHours(outHours, outMinutes, 0, 0)

    let diff = (outDate.getTime() - inDate.getTime()) / (1000 * 60) // diff in minutes

    if (diff < 0) diff += 24 * 60 // handle crossing midnight

    const hours = Math.floor(diff / 60)
    const minutes = Math.round(diff % 60)

    return { hours, minutes }
  }, [hourIn, hourOut])
}
