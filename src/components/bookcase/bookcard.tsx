import styled from '@emotion/styled'

const score = {
  cover:
    'https://musescore.com/static/musescore/scoredata/g/f7c7950e4fdcbd1c7f0a7716bce8198977e39fed/score_0.png@180x252?no-cache=1611220722&bgclr=ffffff',
  name: 'Easy Partition Piano Titanic - My Heart Will Go on',
  author: 'Ackse aSadev',
  instrument: 'Piano',
  opus: 'K232',
  favorite: 23,
  like: 231,
  view: 2341,
}

export const CARD_SIZE = {
  WIDTH: 32,
  MARGIN: 1,
}

export type Score = {
  cover: string
  name: string
  author: string
  opus: string
  favorite: number
  like: number
  view: number
}

export const Bookcard = ({ data }: { data?: Score }) => {
  return <Container>card</Container>
}

const Container = styled.div`
  display: flex;
  width: ${CARD_SIZE.WIDTH}rem;
  height: 18rem;
  margin: ${CARD_SIZE.MARGIN}rem;
  background: #f1f5f8;
  border-radius: 1rem;
  box-shadow: 0 2px 2px rgb(0 0 0 / 15%);

  :hover {
    box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  }
`
