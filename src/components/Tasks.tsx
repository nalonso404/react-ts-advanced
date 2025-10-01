'use client'
import { FC, useReducer, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

type TypeTask = { title: string; completed: boolean; id: string }

type TaskAction = {
  tasks?: TypeTask[]
  type: string
  title?: string
  completed?: boolean
  id?: string
}

const Task: FC<{ data: TypeTask, state: 'edit' | 'only-read', dispatch: React.Dispatch<TaskAction>, setTaskState: React.Dispatch<React.SetStateAction<'edit' | 'only-read'>> }> = ({ data, state, dispatch, setTaskState }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputRef.current) {
      dispatch({ type: 'edit', title: inputRef.current.value, id: data.id })
    }
  }

  return (
    <>
      {state === 'edit' ? (
        <Input type="text" id={data.id} name="task" ref={inputRef} onChange={handleEdit} onBlur={() => setTaskState('only-read')}/>
      ) : (
        <span>{data.title}</span>
      )}
    </>
  )
}

let nextId = 0

export const Tasks: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [taskState, setTaskState] = useState<'edit' | 'only-read'>('only-read')

  const reducer = (state: TypeTask[], action: TaskAction): TypeTask[] => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            title: action.title ?? '',
            completed: false,
            id: `task-${nextId++}`
          }
        ]
      case 'edit':
        return state.map(t => (t.id === action.id ? { ...t, title: action.title ?? '' } : t))
      case 'complete':
        return state.map(t => (t.id === action.id ? { ...t, completed: !t.completed } : t))
      case 'delete':
        return state.filter(t => t.id !== action.id)
      case 'load':
        return action.tasks || []
      default:
        return state
    }
  }

  const [task, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      dispatch({ type: 'load', tasks: JSON.parse(stored) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task))
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'add', title: inputRef.current?.value })
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDelete = (id: string) => {
    if (confirm('Estàs segur que vols borrar aquesta tasca?')) {
      dispatch({ type: 'delete', id })
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="task">Què he de fer avui?</label>
        <div>
          <Input type="text" id="task" name="task" ref={inputRef} />
          <button type="submit">Afegir</button>
        </div>
      </Form>

      <Wrapper>
        {task.map(t => (
          <div key={t.id}>
            <input type="checkbox" checked={t.completed} onChange={() => dispatch({ type: 'complete', title: t.title, id: t.id, completed: t.completed })}/>
            <Task data={t} state={taskState} dispatch={dispatch} setTaskState={setTaskState} />
            <button onClick={() => setTaskState('edit')}>Editar</button>
            <button onClick={() => handleDelete(t.id)}>Borrar</button>
          </div>
        ))}
      </Wrapper>
    </div>
  )
}

const Input = styled.input`
  background: var(--background);
  border-radius: 4px;
  border: 1px solid var(--foreground);
  color: var(--foreground);
  font-size: 16px;
  padding: 8px;
`

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;

  > div {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;

    button {
      background: var(--foreground);
      border-radius: 4px;
      padding: 8px 16px;
      color: var(--background);
      font-weight: 600;
      cursor: pointer;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
    width: 100%;
  }

  button {
    background: var(--foreground);
    border-radius: 4px;
    padding: 8px 16px;
    color: var(--background);
    cursor: pointer;

    &:first-of-type {
      color: var(--foreground);
      border: 1px solid var(--foreground);
      background: var(--background);
    }
  }

  span,
  input[type='text'] {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    min-width: 120px;
  }
`
