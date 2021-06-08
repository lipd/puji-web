import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { color } from 'style/color'
import { translator } from 'utils/translate'

export type MetaItem = {
  key: string
  value: string | string[]
}

export const Meta = ({ data = [] }: { data: MetaItem[] }) => {
  return (
    <Container>
      {data.map((each) => (
        <Item key={each.key}>
          <ItemKey>{each.key}</ItemKey>
          <ItemValue>
            {Array.isArray(each.value) ? (
              <List data={each.value} />
            ) : each.key === '上传时间' ? (
              dayjs(each.value).format('YYYY 年 M 月 D 日')
            ) : (
              each.value
            )}
          </ItemValue>
        </Item>
      ))}
    </Container>
  )
}

const List = ({ data }: { data: string[] }) => {
  return (
    <ListBox>
      {data.map((each) => (
        <ListItem key={each}>{translator[each]}</ListItem>
      ))}
    </ListBox>
  )
}

const Container = styled.div`
  font-size: 1.4rem;
`

const Item = styled.div`
  display: flex;
  margin-bottom: 1rem;
  color: ${color.grey};
  font-weight: 500;
`

const ItemKey = styled.div`
  width: 8rem;
  line-height: 3rem;
`

const ItemValue = styled.div`
  flex: 1;
  align-items: center;
  min-height: 2rem;
  line-height: 3rem;
`

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.div`
  line-height: 2.6rem;
  padding: 0.1rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.7rem;
  border-radius: 0.5rem;
  color: ${color.primary};
  background-color: rgba(83, 115, 255, 0.1);
`
