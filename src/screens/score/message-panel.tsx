import styled from '@emotion/styled'
import { Meta } from './meta'
import { ActionPanel } from 'components/action-panel'
import { Grade } from 'components/grade'
import { color } from 'style/color'
import { Score } from 'types'
import { Skeleton } from 'antd'

interface MessagePanelProp {
  score: Score
  loading: boolean
}
export const MessagePanel = ({ score, loading }: MessagePanelProp) => {
  const meta = [
    { key: '上传时间', value: score.time },
    { key: '作者', value: score.author },
    { key: '乐器', value: score.instruments },
    { key: '风格', value: score.genres },
    { key: '许可', value: score.lisences },
  ]
  return (
    <Container>
      <Skeleton loading={loading} paragraph={{ rows: 16 }}>
        <Title>{score.name}</Title>
        <Grade like={score.like} favorite={score.favorite} star={5} />
        <Divider />
        <Uploader>
          <Avatar src={score.uploader?.avatar} />
          <AvatarName>{score.uploader?.name}</AvatarName>
        </Uploader>
        <ActionPanel />
        <Meta data={meta} />
        <Discription>{score.description}</Discription>
      </Skeleton>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  width: 100%;
  background: ${color.cyan};
`
const Divider = styled.hr`
  margin: 2rem 0 1rem;
  border-top: none;
  border-bottom: 1px solid ${color.greyLight};
`

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${color.somber};
  margin: 0 0 1rem;
`

const Uploader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 2rem;
`

const Avatar = styled.img`
  display: block;
  margin-right: 1rem;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
`

const AvatarName = styled.div`
  font-size: 1.4rem;
  color: ${color.grey};
`

const Discription = styled.p`
  padding: 1rem 0;
  color: ${color.grey};
`
