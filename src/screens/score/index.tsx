import styled from '@emotion/styled'
import { Score } from 'components/score'
import { Layout } from 'layout'
import { MessagePanel } from './message-panel'

export const ScoreScreen = () => {
  return (
    <Layout footer={false}>
      <Container>
        <Left>
          <Score />
        </Left>
        <Right>
          <MessagePanel />
        </Right>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
`
const Left = styled.main`
  flex: 1;
  height: calc(100vh - 6rem);
  overflow: auto;
`

const Right = styled.aside`
  height: calc(100vh - 6rem);
  overflow: auto;
`
