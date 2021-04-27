import styled from '@emotion/styled'
import { Score, Bookcard, CARD_SIZE } from './bookcard'
import { Header } from './header'
import { Pagination } from 'antd'
import { truncateSync } from 'node:fs'

export const Bookcase = ({ scores }: { scores?: Score[] }) => {
  return (
    <Container>
      <Header keyword="Sonata" />
      <BookcardGroup>
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
      </BookcardGroup>
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

const BookcardGroup = styled.div`
  max-width: ${CARD_SIZE.WIDTH * 3 + CARD_SIZE.MARGIN * 6}rem;
  display: flex;
  flex-wrap: wrap;
`

const Bottom = styled.div`
  padding-top: 0.5rem;
  display: flex;
  justify-content: center;
`
