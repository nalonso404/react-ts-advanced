'use client'

import { useTimeDifference } from '@/hooks/useTimeDifference'
import { FC, useState } from 'react'


export const Counter : FC = () => {
  const [hourIn, setHourIn] = useState('')
  const [hourOut, setHourOut] = useState('')
  const result = useTimeDifference(hourIn, hourOut)

  return (
    <div>
      <form>
        <label>Entrada</label> <input type='time' value={hourIn} id='enterMorning' name='enterMorning' required onChange={(e) => setHourIn(e.target.value)}/>
        <label>Sortida</label> <input type='time' value={hourOut}  id='outMorning' name='outMorning' required onChange={(e) => setHourOut(e.target.value)}/>
      </form>
      
      <div>
        {(result.hours > 0) && <span>{result.hours} hores </span>} 
        {(result.minutes > 0) && <span>{result.minutes} minuts</span>} 
      </div>
    </div>
  )
}