import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

interface LayoutProps {
  children: ReactNode
  header?: boolean
  footer?: boolean
}
export const Layout = ({
  children,
  header = true,
  footer = true,
}: LayoutProps) => {
  return (
    <Container>
      {header && <Header />}
      <Main>{children}</Main>
      {footer && <Footer />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
`
