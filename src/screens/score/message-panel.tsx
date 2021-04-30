import styled from '@emotion/styled'
import { ActionPanel } from 'components/action-panel'
import { Grade } from 'components/grade'
import { color } from 'style/color'

const score = {
  name: 'Easy Partition Piano Titanic - My Heart Will Go onsadfsaf asdf',
  author: '李佩道',
  uploader: {
    avatar:
      'https://cdn.dribbble.com/users/2128900/avatars/normal/data?1518354207',
    name: '李佩道',
  },
  instrument: '钢琴',
  time: '2021 年 5 月 21 日',
  genre: ['流行', '电子', '世界音乐', '其他'],
  lisence: ['可商用', '可修改', '可分享', '个人使用'],
  favorite: 23,
  like: 231,
}

export const MessagePanel = () => {
  return (
    <Container>
      <Title>{score.name}</Title>
      <Grade like={score.like} favorite={score.favorite} star={5} />
      <Divider />
      <Uploader>
        <Avatar src={score.uploader.avatar} />
        <AvatarName>{score.uploader.name}</AvatarName>
      </Uploader>
      <ActionPanel />
      <Meta>
        上传时间：{score.time}
        <br />
        乐器：{score.instrument}
        <br />
        作者: {score.author}
      </Meta>
      <Discription />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
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

const Meta = styled.div``

const Discription = styled.div``
