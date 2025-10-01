'use client'

import { useTimeDifference } from '@/hooks/useTimeDifference'
import { FC, useReducer, useState } from 'react'
import styled from 'styled-components'

type TypeState = {
	hours: number
	minutes: number
}

type Action =  | { type: 'sum'; resultMorning: TypeState; resultAfternoon: TypeState }

export const Counter : FC = () => {
  const [hourInMorning, setHourInMorning] = useState('')
  const [hourOutMorning, setHourOutMorning] = useState('')
  const [hourInAfternoon, setHourInAfternoon] = useState('')
  const [hourOutAfternoon, setHourOutAfternoon] = useState('')
  const resultMorning = useTimeDifference(hourInMorning, hourOutMorning)
  const resultAfternoon = useTimeDifference(hourInAfternoon, hourOutAfternoon)
  
  const reducer = (state: TypeState, action: Action): TypeState => {
    switch (action.type) {
      case 'sum':
        const totalMinutes = action.resultMorning.minutes + action.resultAfternoon.minutes
        const totalHours = action.resultMorning.hours + action.resultAfternoon.hours + Math.floor(totalMinutes / 60)
        return {
          hours: totalHours,
          minutes: totalMinutes % 60
        }
      default:
        return state
    }
  }

  const [result, dispatch] = useReducer(reducer, { hours: 0, minutes: 0 })

  return (
    <CounterWrapper>
      <form>
        <label>Entrada Mati</label> <TimeInput type='time' value={hourInMorning} id='enterMorning' name='enterMorning' required onChange={(e) => setHourInMorning(e.target.value)}/>
        <label>Sortida Mati</label> <TimeInput type='time' value={hourOutMorning}  id='outMorning' name='outMorning' required onChange={(e) => setHourOutMorning(e.target.value)}/>
      </form>  
      <div>
        {(resultMorning.hours > 0) && <span>{resultMorning.hours} hores </span>} 
        {(resultMorning.minutes > 0) && <span>{resultMorning.minutes} minuts</span>} 
      </div>

      <form>
        <label>Entrada Tarda</label> <TimeInput type='time' value={hourInAfternoon} id='enterMorning' name='enterMorning' required onChange={(e) => setHourInAfternoon(e.target.value)}/>
        <label>Sortida Tarda</label> <TimeInput type='time' value={hourOutAfternoon}  id='outMorning' name='outMorning' required onChange={(e) => setHourOutAfternoon(e.target.value)}/>
      </form>  
      <div>
        {(resultAfternoon.hours > 0) && <span>{resultAfternoon.hours} hores </span>} 
        {(resultAfternoon.minutes > 0) && <span>{resultAfternoon.minutes} minuts</span>} 
      </div>


      <div>
        {result.hours > 0 ? 
          <>
            <p>RESULTAT FINAL</p>
            {(result.hours > 0) && <span>{result.hours} hores </span>} 
            {(result.minutes > 0) && <span>{result.minutes} minuts</span>} 
          </>
          :

          <button onClick={() => dispatch({type: 'sum', resultMorning, resultAfternoon })}>CALCULAR RESULTAT TOTAL</button>
        }
      </div>
    </CounterWrapper>
  )
}

const CounterWrapper = styled.div`
	display:flex;
	flex-direction: column;
	gap: 20px;
	min-width: 350px;

	> form {
		display: flex;
		flex-direction: column;
		gap: 20px;

		>label {
			font-size: 15px;
		}
	}

	> div {
		padding: 10px;
		> span {
			font-size:15px;
			font-weight: 600;
		}
	}	
	

`


const TimeInput = styled.input.attrs({ type: 'time' })`
  appearance: none;       /* remove default styles in most browsers */
  -webkit-appearance: none;
  -moz-appearance: none;

  background: var(--background);
  color: var(--foreground);
  font-size: 16px;
  font-family: var(--font-geist-sans, sans-serif);

  border: 1px solid var(--foreground);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--foreground);
    outline-offset: 2px;
  }
/* 🎨 Orange #FF9900 for the clock icon */
  &::-webkit-calendar-picker-indicator {
    filter: invert(53%) sepia(97%) saturate(2076%) hue-rotate(1deg) brightness(101%) contrast(105%);
    cursor: pointer;
  }
`