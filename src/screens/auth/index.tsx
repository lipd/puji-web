import styled from '@emotion/styled'
import { Button, Card, Divider, Layout } from 'antd'
import { useState } from 'react'
import { Login } from './login'
import { Register } from './register'
import brand from 'assets/brand.svg'

export const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(true)
  return (
    <Layout>
      <Container>
        <ShadowCard>
          <Header />
          {isRegister ? <Register /> : <Login />}
          <Divider />
          <Button type="link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? '有账号？直接登录' : '没有帐号? 开始注册'}
          </Button>
        </ShadowCard>
      </Container>
    </Layout>
  )
}

const Header = styled.header`
  background: url(${brand}) no-repeat center;
  padding: 5rem 0;
  margin-bottom: 1rem;
  background-size: 13rem 10rem;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 50rem;
  padding: 2rem 5rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const LongButton = styled(Button)`
  margin: 1rem 0;
  width: 100%;
  border-radius: 18px;
`
