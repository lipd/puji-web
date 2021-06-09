import styled from '@emotion/styled'
import { Bookcase } from 'components/bookcase'
import { useRequest } from 'hooks/use-request'
import { Layout } from 'layout'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { color } from 'style/color'
import { Score } from 'types'
import { Filter, useFilter } from 'components/filter'
import { useAuth } from 'hooks/use-auth'

interface ScoreData {
  content: Score[]
  total: number
}

export const FavoritesScreen = () => {
  const [filterState, filterQuery, setFilterState] = useFilter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const request = useRequest()
  const history = useHistory()
  const [scoreData, setScoreData] = useState<ScoreData>({
    content: [],
    total: 0,
  })
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState(0)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    const pageQuery = page > 1 ? `page=${page}&` : ''
    const orderQuery = order > 0 ? `order=${order}&` : ''
    const query = pageQuery + orderQuery + filterQuery

    request({ url: `/users/${user._id}/favorites?${query}` }).then((res) => {
      setScoreData(res.data)
      setLoading(false)
      history.push({ search: query })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filterQuery, page, order])

  return (
    <Layout>
      <Page>
        <Sidebar>
          <Title>筛选条件</Title>
          <Filter filterState={filterState} updater={setFilterState} />
        </Sidebar>
        <Main>
          <Bookcase
            keyword=""
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
  align-items: flex;
  width: 100%;
  padding: 0rem 2rem;
`
