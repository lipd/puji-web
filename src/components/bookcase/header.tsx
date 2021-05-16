import { Menu, Dropdown, Button } from 'antd'
import styled from '@emotion/styled'
import { ReactComponent as Sort } from 'assets/sort.svg'
import { color } from 'style/color'

const menu = (
  <Menu>
    <Menu.Item key="0">默认排序</Menu.Item>
    <Menu.Item key="1">从早到晚排序</Menu.Item>
    <Menu.Item key="2">从晚到早降序</Menu.Item>
    <Menu.Item key="3">按点赞数排序</Menu.Item>
    <Menu.Item key="4">按收藏数排序</Menu.Item>
  </Menu>
)

type HeaderProps = {
  keyword?: string
  filter?: string
}
export const Header = ({ keyword, filter }: HeaderProps) => {
  return (
    <Container>
      <Left>
        <Hint>
          以下为关键词 <Keyword>{keyword}</Keyword> 的搜索结果
        </Hint>
      </Left>
      <Right>
        <Dropdown overlay={menu} trigger={['click']}>
          <Sorter type="link">
            <SorterText>
              排序方式：<span style={{ color: color.primary }}>默认</span>
            </SorterText>
            <SortIcon width="2rem" height="2rem" />
          </Sorter>
        </Dropdown>
      </Right>
    </Container>
  )
}

const Container = styled.div`
  min-width: 100rem;
  display: flex;
  margin: 1rem 1rem 0.5rem;
  padding: 0 0 0.2rem 0;
  border-bottom: 1px solid ${color.greyLight};
`

const Left = styled.div`
  flex: 1;
`

const Hint = styled.h2`
  font-size: 1.4rem;
  font-weight: 300;
`

const Keyword = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${color.primary};
`

const Right = styled.div`
  display: flex;
  align-items: flex-end;
`

const Sorter = styled(Button)`
  display: flex;
  padding: 0;
  height: 2.4rem;
`

const SorterText = styled.h4`
  font-size: 1.4rem;
  padding-right: 0.5rem;
  color: ${color.somber};
  :hover {
    color: ${color.primary};
  }
`

const SortIcon = styled(Sort)`
  display: block;
  position: relative;
  top: 1px;
  fill: ${color.somber};

  :hover {
    fill: ${color.primary};
  }
`
