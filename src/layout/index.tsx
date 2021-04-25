import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
`
