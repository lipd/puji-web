import styled from '@emotion/styled'
import { Bookcase } from 'components/bookcase'
import { Layout } from 'layout'
import { color } from 'style/color'
import { Filter, FilterDataType, useFilter } from './filter'

const filterData: FilterDataType[] = [
  {
    name: 'license',
    title: '版权许可',
    options: [
      { label: '允许修改', value: 'to-change' },
      { label: '允许商用', value: 'to-commertial' },
      { label: '允许分享', value: 'to-share' },
      { label: '允许个人使用', value: 'to-personal' },
    ],
  },
  {
    name: 'instrument',
    title: '乐器',
    options: [
      { label: '键盘', value: 'keyboard' },
      { label: '弦乐', value: 'string' },
      { label: '管乐', value: 'wind' },
      { label: '打击乐', value: 'percussion' },
      { label: '声乐', value: 'vocal' },
      { label: '乐队', value: 'band' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    name: 'genre',
    title: '风格',
    options: [
      { label: '古典', value: 'classical' },
      { label: '流行', value: 'pop' },
      { label: '爵士', value: 'jazz' },
      { label: '乡村', value: 'country' },
      { label: '摇滚', value: 'rock' },
      { label: '民乐', value: 'chinese' },
      { label: '世界音乐', value: 'world-music' },
      { label: '其他', value: 'other' },
    ],
  },
]

export const DiscoverScreen = () => {
  const [filterState, setFilterState] = useFilter(filterData)

  return (
    <Layout>
      <Page>
        <Sidebar>
          <Title>筛选条件</Title>
          <Filter
            filterData={filterData}
            filterState={filterState}
            updater={setFilterState}
          />
        </Sidebar>
        <Main>
          <Bookcase />
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
