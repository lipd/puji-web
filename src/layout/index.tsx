import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

interface LayoutProps {
  children?: ReactNode
  header?: boolean
  footer?: boolean
  fullScreen?: boolean
}

interface ContainerProps {
  fullScreen: boolean
}

export const Layout = ({
  children,
  header = true,
  footer = true,
  fullScreen = false,
}: LayoutProps) => {
  return (
    <Container fullScreen={fullScreen}>
      {header && <Header />}
      <Main>{children}</Main>
      {footer && <Footer />}
    </Container>
  )
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.fullScreen ? '100vh' : '0')};
`

const Main = styled.main`
  flex: 1;
`
