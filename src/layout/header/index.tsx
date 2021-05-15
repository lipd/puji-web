import styled from '@emotion/styled'
import { ReactComponent as BrandIcon } from 'assets/brand.svg'
import { ReactComponent as Upload } from 'assets/upload.svg'
import { useAuth } from 'hooks/use-auth'
import { color } from 'style/color'
import { Searcher } from './search'
import userOnline from 'assets/user-online.svg'
import userOffline from 'assets/user-offline.svg'

interface AvatarProps {
  icon: string
}

export const Header = () => {
  const { user } = useAuth()
  let icon: string
  if (user) {
    icon = user.avatar ? user.avatar : userOnline
  } else {
    icon = userOffline
  }
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
        <Avatar icon={icon} />
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
    color: ${color.primary};
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.div<AvatarProps>`
  background: url(${(props) => props.icon}) center no-repeat;
  background-size: 3.2rem;
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
    fill: ${color.primary};
  }
`
