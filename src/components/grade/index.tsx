import styled from '@emotion/styled'
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg'
import { ReactComponent as LikeIcon } from 'assets/like.svg'
import { color } from 'style/color'

// type GradeProps = {
//   like: number
//   favorite: number
//   star: number
// }
export const Grade = ({
  like,
  favorite,
}: {
  like: number
  favorite: any
  star: any
}) => {
  return (
    <Container>
      <Item>
        <LikeIcon className="icon" />
        <Text>{like}</Text>
      </Item>
      <Item>
        <FavoriteIcon className="icon" />
        <Text>{favorite}</Text>
      </Item>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: ${color.grey};
  :first-of-type {
    margin-right: 2rem;
  }

  .icon {
    fill: ${color.primary};
    height: 1.4rem;
    width: 1.4rem;
    margin-right: 0.5rem;
  }
`

const Text = styled.div``
