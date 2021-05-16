import styled from '@emotion/styled'
import { color } from 'style/color'

export type MetaItem = {
  key: string
  value: string | string[]
}

export const Meta = ({ data = [] }: { data: MetaItem[] }) => {
  return (
    <Container>
      {data.map((each, i) => (
        <Item key={each.key}>
          <ItemKey>{each.key}</ItemKey>
          <ItemValue>
            {Array.isArray(each.value) ? (
              <List data={each.value} />
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
        <ListItem key={each}>{each}</ListItem>
      ))}
    </ListBox>
  )
}

const Container = styled.div`
  font-size: 1.4rem;
`

const Item = styled.div`
  display: flex;
  color: ${color.grey};
  margin-bottom: 1rem;
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
