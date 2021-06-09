import styled from '@emotion/styled'
import { Meta } from './meta'
import { ActionPanel } from 'components/action-panel'
import { Grade } from 'components/grade'
import { color } from 'style/color'
import { Score } from 'types'
import { Skeleton } from 'antd'
import { MetaItem } from './meta'
import { useState } from 'react'
import userIcon from 'assets/user-online.svg'

interface MessagePanelProp {
  score: Score | null
  loading: boolean
  liked: boolean
  setLiked: (value: boolean) => void
  favorited: boolean
  setFavorited: (value: boolean) => void
}
export const MessagePanel = ({
  score,
  loading,
  liked,
  setLiked,
  favorited,
  setFavorited,
}: MessagePanelProp) => {
  const [likeAdd, setLikeAdd] = useState(0)
  const [favoriteAdd, setFavoriteAdd] = useState(0)

  let meta
  if (score) {
    meta = [
      { key: '上传时间', value: score.createdAt },
      { key: '作者', value: score.author },
      { key: '乐器', value: score.instruments },
      { key: '风格', value: score.genres },
      { key: '许可', value: score.licenses },
    ]
  }

  return (
    <Container>
      <Skeleton active loading={loading} paragraph={{ rows: 16 }}>
        {score && (
          <>
            <Title>{score.name}</Title>
            <Grade
              like={score.likes + likeAdd}
              favorite={score.favorites + favoriteAdd}
              star={5}
            />
            <Divider />
            <Uploader>
              <Avatar src={score.uploader?.avatar || userIcon} />
              <AvatarName>{score.uploader?.name}</AvatarName>
            </Uploader>
            <ActionPanel
              score={score}
              liked={liked}
              setLiked={setLiked}
              favorited={favorited}
              setFavorited={setFavorited}
              setLikeAdd={setLikeAdd}
              setFavoriteAdd={setFavoriteAdd}
            />
            <Meta data={meta as MetaItem[]} />
            <Discription>{score.description}</Discription>
          </>
        )}
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
  margin: 2rem 0 3rem;
`

const Avatar = styled.img`
  background-size: 4rem;
  display: block;
  margin-right: 1rem;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
`

const AvatarName = styled.div`
  padding-left: 0.5rem;
  font-size: 1.7rem;
  font-weight: 400;
  color: ${color.somber};
`

const Discription = styled.p`
  padding: 1rem 0;
  color: ${color.grey};
`
