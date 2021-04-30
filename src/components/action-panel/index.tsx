import { ReactComponent as LikeIcon } from 'assets/like.svg'
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg'
import { ReactComponent as DownloadIcon } from 'assets/download.svg'
import { ReactComponent as PrintIcon } from 'assets/print.svg'
import { ReactComponent as ShareIcon } from 'assets/share.svg'
import styled from '@emotion/styled'
import { color } from 'style/color'

export const ActionPanel = () => {
  return (
    <Container>
      <LikeIcon className="icon" />
      <FavoriteIcon className="icon" />
      <DownloadIcon className="icon" />
      <ShareIcon className="icon" />
      <PrintIcon className="icon" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1rem;

  .icon {
    fill: ${color.primary};
    width: 2.4rem;
    height: 2.4rem;
  }
`
