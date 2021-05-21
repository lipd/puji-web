import styled from '@emotion/styled'
import { color } from 'style/color'
import { useRequest } from 'hooks/use-request'
import { useParams } from 'react-router'
import { Button, message } from 'antd'
import { useAuth } from 'hooks/use-auth'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import fileDownload from 'js-file-download'
// @ts-ignore
import { saveSvgAsPng } from 'save-svg-as-png'
import { ReactComponent as LikeIcon } from 'assets/like.svg'
import { ReactComponent as LikeFillIcon } from 'assets/like-fill.svg'
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg'
import { ReactComponent as FavoriteFillIcon } from 'assets/favorite-fill.svg'
import { ReactComponent as DownloadIcon } from 'assets/download.svg'
import { ReactComponent as PrintIcon } from 'assets/print.svg'
import { ReactComponent as ShareIcon } from 'assets/share.svg'
import { Score } from 'types'
import axios from 'axios'
import { useState } from 'react'

interface ActionPanelProps {
  score: Score | null
  liked: boolean
  setLiked: (value: boolean) => void
  favorited: boolean
  setFavorited: (value: boolean) => void
  setLikeAdd: React.Dispatch<React.SetStateAction<number>>
  setFavoriteAdd: React.Dispatch<React.SetStateAction<number>>
}
export const ActionPanel = ({
  score,
  liked,
  setLiked,
  favorited,
  setFavorited,
  setLikeAdd,
  setFavoriteAdd,
}: ActionPanelProps) => {
  const request = useRequest()
  const { user } = useAuth()
  const { id } = useParams<{ id: string }>()
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)

  const handleLike = async () => {
    setLikeLoading(true)
    if (!user) {
      return message.warning('点赞前请先登录')
    }

    try {
      await request({
        url: `/users/liking/${id}`,
        method: 'PUT',
      })
      setLiked(true)
      setLikeAdd((prev) => prev + 1)
    } catch (err) {
      message.error('点赞失败')
    }
    setLikeLoading(false)
  }

  const handleUnlike = async () => {
    setLikeLoading(true)
    try {
      await request({
        url: `/users/liking/${id}`,
        method: 'DELETE',
      })
      setLiked(false)
      setLikeAdd((prev) => prev - 1)
    } catch (err) {
      message.error('取消点赞失败')
    }
    setLikeLoading(false)
  }

  const handleFavroite = async () => {
    setFavoriteLoading(true)
    if (!user) {
      return message.warning('收藏前请先登录')
    }

    try {
      await request({
        url: `/users/favorite/${id}`,
        method: 'PUT',
      })
      setFavorited(true)
      setFavoriteAdd((prev) => prev + 1)
    } catch (err) {
      message.error('收藏失败')
    }
    setFavoriteLoading(false)
  }

  const handleUnfavroite = async () => {
    setFavoriteLoading(true)
    try {
      await request({
        url: `/users/favorite/${id}`,
        method: 'DELETE',
      })
      setFavorited(false)
      setFavoriteAdd((prev) => prev - 1)
    } catch (err) {
      message.error('取消收藏失败')
    }
    setFavoriteLoading(false)
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
    await saveSvgAsPng(svgElement, filename, { backgroundColor: '#ffffff' })
  }

  return (
    <Container>
      {liked ? (
        <Button type="link" disabled={likeLoading} onClick={handleUnlike}>
          <LikeFillIcon className="icon-active" />
        </Button>
      ) : (
        <Button type="link" disabled={likeLoading} onClick={handleLike}>
          <LikeIcon className="icon" />
        </Button>
      )}
      {favorited ? (
        <Button
          type="link"
          disabled={favoriteLoading}
          onClick={handleUnfavroite}
        >
          <FavoriteFillIcon className="icon-active" />
        </Button>
      ) : (
        <Button type="link" disabled={favoriteLoading} onClick={handleFavroite}>
          <FavoriteIcon className="icon" />
        </Button>
      )}

      <Button
        type="link"
        onClick={() =>
          handleDownload(score?.xmlUrl as string, score?.name as string)
        }
      >
        <DownloadIcon className="icon" />
      </Button>

      <CopyToClipboard
        text={score?.name + ': ' + window.location.href}
        onCopy={handleCopy}
      >
        <Button type="link">
          <ShareIcon className="icon" />
        </Button>
      </CopyToClipboard>

      <Button type="link" onClick={() => handlePrint(score?.name as string)}>
        <PrintIcon className="icon" />
      </Button>
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

  .ant-btn-link {
    padding: 0;
  }
`
