'use client'

import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export const Nav: FC = () => {
  return (
    <NavWrapper>
      <Link href='/'>Inici</Link>
      <Link href='/tasks'>Veure tasques</Link>
      <Link href='/counter'>Veure comptador</Link>
    </NavWrapper>
  )
}


const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 20px;
    background-color: var(--foreground);
    padding: 20px 60px;
    width: 100vw;
    width: 100dvw;
    height: 60px;
    a {
      color: var(--color-white);
        font-family: var(--font-geist-sans);
        font-weight: 600;
    }
`