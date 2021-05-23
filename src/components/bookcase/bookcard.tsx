import styled from '@emotion/styled'
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg'
import { ReactComponent as LikeIcon } from 'assets/like.svg'
import { color } from 'style/color'
import { Score } from 'types'
import { instrumentTable } from 'utils/translate'

type InstrumentTag = keyof typeof instrumentTable

export const CARD_SIZE = {
  WIDTH: 32,
  HEIGHT: 18,
  MARGIN: 1,
}

export const Bookcard = ({ score }: { score: Score }) => {
  const instruments = score.instruments
    .slice(0, 4)
    .map((each) => instrumentTable[each as InstrumentTag])
  const instrumentNames =
    score.instruments.length > 3 ? [...instruments, '...'] : instruments

  return (
    <Container>
      <ImageContainer>
        <Image src={score.cover} />
      </ImageContainer>
      <Meta>
        <Top>
          <Title title={score.name}>{score.name}</Title>
          <Author title={score.author}>
            <AuthorText>{score.author}</AuthorText>
          </Author>
          <InstrumentGroup>
            {instrumentNames.map((each) => (
              <Instrument key={each}>{each}</Instrument>
            ))}
          </InstrumentGroup>
        </Top>
        <Bottom>
          <FavoriteIcon className="icon" />
          <BottomText>{score.favorites}</BottomText>
          <LikeIcon className="icon like" />
          <BottomText>{score.likes}</BottomText>
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
  background: ${color.cyan};
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  padding: 2rem;

  :hover {
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  }
`

const ImageContainer = styled.div`
  background: white;
  margin-right: 1rem;
  box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
  box-sizing: content-box;
  padding: 0.1rem;
`

const Image = styled.img`
  width: 9.5rem;
`

const Meta = styled.div`
  display: flex;
  flex: 1;
  width: 17.3rem;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
`

const Top = styled.div`
  flex: 1;
  width: 100%;
`

const Title = styled.h2`
  width: 100%;
  margin-bottom: 0.8rem;
  height: 3.6rem;
  font-weight: 500;
  font-size: 1.3rem;
`

const Author = styled.div`
  margin-bottom: 0.7rem;
  width: 16rem;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const AuthorText = styled.span`
  background: ${color.primary};
  color: ${color.cyan};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
`

const InstrumentGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 17.3rem;
  font-size: 1.2rem;
  color: ${color.grey};
  font-weight: 500;
`

const Instrument = styled.div`
  color: ${color.primary};
  background: ${color.primaryLight};
  border-radius: 0.5rem;
  padding: 0.2rem 0.4rem;
  margin: 0.1rem;
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${color.grey};
  padding-left: 0.3rem;

  .icon {
    display: block;
    margin-right: 0.5rem;
    fill: ${color.primary};
    width: 1.4rem;
    height: 1.4rem;
  }

  .like {
    position: relative;
    margin-left: 3rem;
  }
`

const BottomText = styled.div``
