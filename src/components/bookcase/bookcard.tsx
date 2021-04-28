import styled from '@emotion/styled'
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg'
import { ReactComponent as LikeIcon } from 'assets/like.svg'

const score = {
  cover:
    'https://musescore.com/static/musescore/scoredata/g/f7c7950e4fdcbd1c7f0a7716bce8198977e39fed/score_0.png@180x252?no-cache=1611220722&bgclr=ffffff',
  name: 'Easy Partition Piano Titanic - My Heart Will Go onsadfsaf asdf',
  author: 'Ackse Avdwes',
  instrument: '钢琴',
  favorite: 23,
  like: 231,
}

export const CARD_SIZE = {
  WIDTH: 32,
  HEIGHT: 18,
  MARGIN: 1,
}

export type Score = {
  cover: string
  name: string
  author: string
  favorite: number
  like: number
  view: number
}

export const Bookcard = ({ data }: { data?: Score }) => {
  return (
    <Container>
      <Image src={score.cover} />
      <Meta>
        <Top>
          <Title title={score.name}>{score.name}</Title>
          <Author title={score.author}>{score.author}</Author>
          <Instrument>{score.instrument}</Instrument>
        </Top>
        <Bottom>
          <FavoriteIcon className="icon" />
          <BottomText>{score.favorite}</BottomText>
          <LikeIcon className="icon like" />
          <BottomText>{score.like}</BottomText>
        </Bottom>
      </Meta>
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: ${CARD_SIZE.WIDTH}rem;
  height: ${CARD_SIZE.HEIGHT}rem;
  margin: ${CARD_SIZE.MARGIN}rem;
  background: #f1f5f8;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  padding: 2rem;

  :hover {
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  }
`

const Image = styled.img`
  box-sizing: content-box;
  height: 14rem;
  width: 10rem;
  margin-right: 1rem;
  box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  flex: 1;
`

const Title = styled.h2`
  margin-bottom: 0.8rem;
  height: 4rem;
  font-weight: 500;
  font-size: 1.3rem;
  overflow: hidden;
`

const Author = styled.div`
  padding-left: 0.5rem;
  margin-bottom: 0.2rem;
  width: 16rem;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #8792a6;
`

const Instrument = styled.div`
  padding-left: 0.5rem;
  font-size: 1.2rem;
  color: #8792a6;
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: #8792a6;
  padding: 0 0 1rem 0.5rem;

  .icon {
    display: block;
    margin-right: 0.5rem;
    fill: #5372ff;
    width: 1.4rem;
    height: 1.4rem;
  }

  .like {
    position: relative;
    margin-left: 3rem;
  }
`

const BottomText = styled.div``
