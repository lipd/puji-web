import styled from '@emotion/styled'
import { ReactComponent as GithubIcon } from 'assets/github.svg'
import { ReactComponent as ZhihuIcon } from 'assets/zhihu.svg'
import { ReactComponent as WechatIcon } from 'assets/wechat.svg'

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Column>
          <Headline>相关资源</Headline>
          <Item>MuseScore</Item>
          <Item>musicXML</Item>
        </Column>
        <Column>
          <Headline>技术支持</Headline>
          <Item>OSMD</Item>
          <Item>vexflow</Item>
        </Column>
        <Column>
          <Headline>倾情推荐</Headline>
          <Item>Practice Bird</Item>
          <Item>Sun Score</Item>
        </Column>
        <Column>
          <Headline>关于作者</Headline>
          <Item>结网集</Item>
        </Column>
      </Left>
      <Right>
        <GithubIcon className="icon" />
        <ZhihuIcon className="icon middle" />
        <WechatIcon className="icon" />
      </Right>
    </Container>
  )
}

const Container = styled.footer`
  display: flex;
  padding: 4rem calc((100% - 120rem) / 2) 4rem;
  background: #2a2a2a;
`

const Left = styled.div`
  flex: 6;
  display: flex;
  justify-content: space-between;
`

const Column = styled.div``

const Headline = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 400;
  color: white;
`

const Item = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: 300;
  color: white;
`

const Right = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;

  .icon {
    display: block;
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 1rem;
  }
`
