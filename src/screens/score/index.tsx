import styled from '@emotion/styled'
import { Score } from 'components/score'
import { Layout } from 'layout'
import { color } from 'style/color'
import { MessagePanel } from './message-panel'

export const ScoreScreen = () => {
  return (
    <Layout footer={false}>
      <Container>
        <Player />
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
  margin-top: 4rem;
  flex: 1;
  display: relative;
  height: calc(100vh - 10rem);
  overflow: auto;
`

const Player = styled.div`
  position: absolute;
  width: calc(100% - 40rem);
  height: 4rem;
  background: ${color.cyan};
`

const Right = styled.aside`
  width: 40rem;
  border-left: 1px solid ${color.greyLight};
  height: calc(100vh - 6rem);
  overflow: auto;
`
