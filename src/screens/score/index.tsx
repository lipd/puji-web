import styled from '@emotion/styled'
import { Score } from 'components/score'
import { ScorePlayer } from 'components/score/score-player'
import { useScore } from 'components/score/useScore'
import { useMount } from 'hooks/use-mount'
import { useRequest } from 'hooks/use-request'
import { Layout } from 'layout'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { color } from 'style/color'
import { Score as ScoreType } from 'types'
import { MessagePanel } from './message-panel'

export const ScoreScreen = () => {
  const { id } = useParams<{ id: string }>()
  const scoreRef = useRef(null)
  const [scoreData, setScoreData] = useState<null | ScoreType>(null)
  const [loading, setLoading] = useState(true)
  const request = useRequest()
  const { renderer, player } = useScore({ scoreRef, scoreData })

  useMount(() => {
    request({
      url: `scores/${id}`,
    }).then((res) => {
      setScoreData(res.data)
      setLoading(false)
    })
  })

  return (
    <Layout footer={false}>
      <Container>
        <Player>
          <ScorePlayer player={player} />
        </Player>
        <Left>
          <Score renderer={renderer} scoreRef={scoreRef} />
        </Left>
        <Right>
          <MessagePanel score={scoreData} loading={loading} />
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
`

const Right = styled.aside`
  width: 40rem;
  border-left: 1px solid ${color.greyLight};
  height: calc(100vh - 6rem);
  overflow: auto;
`
