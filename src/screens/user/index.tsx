import styled from '@emotion/styled'
import { Layout } from 'layout'
import { Table } from './table'

export const UserScreen = () => {
  return (
    <Layout>
      <Container>
        <Table />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  background: #f0f2f5;
  justify-content: center;
`
