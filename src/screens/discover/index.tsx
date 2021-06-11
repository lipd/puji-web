import styled from '@emotion/styled'
import { Bookcase } from 'components/bookcase'
import { useRequest } from 'hooks/use-request'
import { useQuery } from 'hooks/useQuery'
import { Layout } from 'layout'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { color } from 'style/color'
import { Score } from 'types'
import { Filter, useFilter } from 'components/filter'

interface ScoreData {
  content: Score[]
  total: number
}

export const DiscoverScreen = () => {
  const [filterState, filterQuery, setFilterState] = useFilter()
  const request = useRequest()
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const [scoreData, setScoreData] = useState<ScoreData>({
    content: [],
    total: 0,
  })
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState(0)
  const urlQuery = useQuery()
  const q = urlQuery.get('q') || ''

  useEffect(() => {
    setLoading(true)
    const searchQuery = q ? `q=${q}&` : ''
    const pageQuery = page > 1 ? `page=${page}&` : ''
    const orderQuery = order > 0 ? `order=${order}&` : ''
    const query = searchQuery + pageQuery + orderQuery + filterQuery
    request({ url: `/scores?${query}` }).then((res) => {
      setScoreData(res.data)
      setLoading(false)
      history.push({ search: query })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery, page, order, q])

  return (
    <Layout>
      <Page>
        <Sidebar>
          <Title>筛选条件</Title>
          <Filter filterState={filterState} updater={setFilterState} />
        </Sidebar>
        <Main>
          <Bookcase
            keyword={q}
            scores={scoreData.content}
            total={scoreData.total}
            page={page}
            setPage={setPage}
            order={order}
            setOrder={setOrder}
            loading={loading}
          />
        </Main>
      </Page>
    </Layout>
  )
}

export const Sidebar = styled.aside`
  @media screen and (max-width: 1260px) {
    display: none;
  }
  padding: 2rem 3rem;
  box-sizing: border-box;
  width: 30rem;
  background: ${color.cyan};
`

const Page = styled.div`
  min-height: 100%;
  display: flex;
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${color.somber};
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0rem 2rem;
`
