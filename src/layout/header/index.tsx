import styled from '@emotion/styled'
import { ReactComponent as BrandIcon } from 'assets/brand.svg'
import { ReactComponent as Upload } from 'assets/upload.svg'
import { useAuth } from 'hooks/use-auth'
import { color } from 'style/color'
import { Searcher } from './search'
import userOnline from 'assets/user-online.svg'
import userOffline from 'assets/user-offline.svg'
import { Dropdown, Menu, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'

interface AvatarProps {
  icon: string
}

export const Header = () => {
  const { user, logout } = useAuth()
  const history = useHistory()
  let icon: string
  if (user) {
    icon = user.avatar ? user.avatar : userOnline
  } else {
    icon = userOffline
  }

  const handleLogout = () => {
    logout()
    history.push('/sign')
    message.success('已成功登出')
  }

  const menu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item>
            <Link to={`/user/${user._id}`}>个人主页</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item danger onClick={handleLogout}>
            登出
          </Menu.Item>
        </>
      ) : (
        <Menu.Item>
          <Link to="/sign">登录</Link>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <Container>
      <HeaderLeft>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <BrandIcon width="10.5rem" height="3.5rem" />
        </Link>
        <Link to="/">
          <NavItem>首页</NavItem>
        </Link>
        <Link to="/favorites">
          <NavItem>收藏夹</NavItem>
        </Link>
        <Link to="/mine">
          <NavItem>我的乐谱</NavItem>
        </Link>
      </HeaderLeft>
      <HeaderRight>
        <Searcher />
        <Dropdown overlay={menu}>
          <Avatar icon={icon} />
        </Dropdown>
        <Link to="/upload" style={{ height: '3.2rem' }}>
          <UploadIcon />
        </Link>
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
  @media screen and (max-width: 750px) {
    padding-left: 2rem;
  }
  @media screen and (max-width: 700px) {
    padding-left: 1rem;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
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
  top: 1px;
  height: 3.2rem;
  width: 3.2rem;

  :hover {
    fill: ${color.primary};
  }
`
