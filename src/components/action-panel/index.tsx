import styled from '@emotion/styled'
import { color } from 'style/color'
import { useRequest } from 'hooks/use-request'
import { useParams } from 'react-router'
import { message } from 'antd'
import { useAuth } from 'hooks/use-auth'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import fileDownload from 'js-file-download'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
import { ReactComponent as LikeIcon } from 'assets/like.svg'
import { ReactComponent as LikeFillIcon } from 'assets/like-fill.svg'
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg'
import { ReactComponent as FavoriteFillIcon } from 'assets/favorite-fill.svg'
import { ReactComponent as DownloadIcon } from 'assets/download.svg'
import { ReactComponent as PrintIcon } from 'assets/print.svg'
import { ReactComponent as ShareIcon } from 'assets/share.svg'
import { Score } from 'types'
import axios from 'axios'

interface ActionPanelProps {
  score: Score | null
  liked: boolean
  setLiked: (value: boolean) => void
  favorited: boolean
  setFavorited: (value: boolean) => void
}
export const ActionPanel = ({
  score,
  liked,
  setLiked,
  favorited,
  setFavorited,
}: ActionPanelProps) => {
  const request = useRequest()
  const { user } = useAuth()
  const { id } = useParams<{ id: string }>()

  const handleLike = async () => {
    if (!user) {
      return message.warning('点赞前请先登录')
    }

    try {
      await request({
        url: `/users/liking/${id}`,
        method: 'PUT',
      })
      setLiked(true)
    } catch (err) {
      message.error('点赞失败')
    }
  }

  const handleUnlike = async () => {
    try {
      await request({
        url: `/users/liking/${id}`,
        method: 'DELETE',
      })
      setLiked(false)
    } catch (err) {
      message.error('取消点赞失败')
    }
  }

  const handleFavroite = async () => {
    if (!user) {
      return message.warning('收藏前请先登录')
    }

    try {
      await request({
        url: `/users/favorite/${id}`,
        method: 'PUT',
      })
      setLiked(true)
    } catch (err) {
      message.error('收藏失败')
    }
  }

  const handleUnfavroite = async () => {
    try {
      await request({
        url: `/users/favorite/${id}`,
        method: 'DELETE',
      })
      setLiked(false)
    } catch (err) {
      message.error('取消收藏失败')
    }
  }

  const handleDownload = (url: string, filename: string) => {
    axios.get(url, { responseType: 'blob' }).then((res) => {
      fileDownload(res.data, filename + '.xml')
    })
  }

  const handleCopy = () => {
    message.success('链接已复制')
  }

  const handlePrint = async (filename: string) => {
    const svgElement = document.getElementById('osmdSvgPage1') as HTMLElement
    const positionInfo = svgElement.getBoundingClientRect()
    const width = positionInfo.width
    const height = positionInfo.height
    const pdf = new jsPDF(width > height ? 'l' : 'p', 'pt', [height, width])
    await pdf.svg(svgElement, { width, height })
    pdf.save(filename)
  }

  return (
    <Container>
      {liked ? (
        <LikeFillIcon className="icon-active" onClick={handleUnlike} />
      ) : (
        <LikeIcon className="icon" onClick={handleLike} />
      )}
      {favorited ? (
        <FavoriteFillIcon className="icon-active" onClick={handleUnfavroite} />
      ) : (
        <FavoriteIcon className="icon" onClick={handleFavroite} />
      )}
      <DownloadIcon
        className="icon"
        onClick={() =>
          handleDownload(score?.xmlUrl as string, score?.name as string)
        }
      />
      <CopyToClipboard
        text={score?.name + ': ' + window.location.href}
        onCopy={handleCopy}
      >
        <ShareIcon className="icon" />
      </CopyToClipboard>
      <PrintIcon
        className="icon"
        onClick={() => handlePrint(score?.name as string)}
      />
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

    :hover {
      fill: ${color.pink};
    }
  }

  .icon-active {
    width: 2.4rem;
    height: 2.4rem;
  }
`
