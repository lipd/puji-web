import styled from '@emotion/styled'
import { Bookcard, CARD_SIZE } from './bookcard'
import { Header } from './header'
import { Pagination, Spin } from 'antd'
import { Score } from 'types'
import { Link } from 'react-router-dom'

interface BookcaseProps {
  keyword: string
  scores: Score[]
  total: number
  page: number
  setPage: (page: number) => void
  order: number
  setOrder: (order: number) => void
  loading: boolean
}
export const Bookcase = ({
  keyword,
  scores,
  total,
  page,
  setPage,
  order,
  setOrder,
  loading,
}: BookcaseProps) => {
  const handleChangePage = (page: number) => {
    setPage(page)
  }

  return (
    <Container>
      {loading ? (
        <Spin size="default" tip="乐谱加载中......" />
      ) : (
        <div>
          <Header keyword={keyword} order={order} setOrder={setOrder} />
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
            {total > 0 && (
              <Pagination
                current={page}
                pageSize={9}
                total={total}
                onChange={handleChangePage}
              />
            )}
          </Bottom>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 6rem);
`

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
