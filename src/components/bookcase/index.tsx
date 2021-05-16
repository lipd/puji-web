import styled from '@emotion/styled'
import { Bookcard, CARD_SIZE } from './bookcard'
import { Header } from './header'
import { Pagination } from 'antd'
import { Score } from 'types'
import { Link } from 'react-router-dom'

export const Bookcase = ({ scores }: { scores: Score[] }) => {
  return (
    <Container>
      <Header keyword="Sonata" />
      <Wrapper>
        <BookcardGroup>
          {scores.map((score) => (
            <Link key={score._id} to={`/score/${score._id}`}>
              <Bookcard score={score} />
            </Link>
          ))}
        </BookcardGroup>
      </Wrapper>
      <Bottom>
        <Pagination
          defaultCurrent={1}
          pageSize={9}
          total={20}
          hideOnSinglePage
        />
      </Bottom>
    </Container>
  )
}

const Container = styled.div``

const Wrapper = styled.div`
  min-height: ${CARD_SIZE.HEIGHT * 3 + CARD_SIZE.MARGIN * 6}rem;
`

const BookcardGroup = styled.div`
  max-width: ${CARD_SIZE.WIDTH * 3 + CARD_SIZE.MARGIN * 6}rem;
  display: flex;
  flex-wrap: wrap;
`

const Bottom = styled.div`
  padding: 0.6rem 0 2rem;
  display: flex;
  justify-content: center;
`
