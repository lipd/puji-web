import styled from '@emotion/styled'
import { ReactComponent as BrandIcon } from 'assets/brand.svg'
import { ReactComponent as Upload } from 'assets/upload.svg'
import { Searcher } from './search'

export const Header = () => {
  return (
    <Container>
      <HeaderLeft>
        <BrandIcon width="10.5rem" height="3.5rem" />
        <NavItem>发现</NavItem>
        <NavItem>收藏</NavItem>
        <NavItem>频道</NavItem>
      </HeaderLeft>
      <HeaderRight>
        <Searcher />
        <Avatar src="http://iconfont.alicdn.com/t/87e2bccd-e9ce-451a-8e93-346c073ce4a4.png@200h_200w.jpg" />
        <UploadIcon />
      </HeaderRight>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  background: white;
  height: 6rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0 4rem;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const NavItem = styled.h2`
  padding-left: 3rem;
  line-height: 3rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #8590a6;

  :hover {
    color: #5372ff;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  display: block;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
  margin: 0rem 1.5rem 0rem 1.5rem;
`

const UploadIcon = styled(Upload)`
  fill: #707070;
  position: relative;
  top: 2px;
  height: 3.2rem;
  width: 3.5rem;

  :hover {
    fill: #5372ff;
  }
`
