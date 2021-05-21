import { message } from 'antd'
import { AuthRequest } from 'types'

interface uploadCoverParams {
  canvas: HTMLCanvasElement
  request: AuthRequest
}

interface Callback {
  (res: any): void
}

export const uploadCover = (
  { canvas, request }: uploadCoverParams,
  cb: Callback,
) => {
  const tempCanvas = document.createElement('canvas')
  const ctx = tempCanvas.getContext('2d') as CanvasRenderingContext2D
  const img = new Image()
  img.onload = () => {
    const width = canvas.width
    const height = (width / 350) * 495
    tempCanvas.width = width
    tempCanvas.height = height
    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)

    tempCanvas.toBlob((blob) => {
      const data = new FormData()

      data.append('file', blob as Blob)
      // TODO: 实现 header 合并
      request({
        url: '/upload/cover',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      })
        .then(cb)
        .catch(() => {
          message.error('封面生成失败')
        })
    })
  }
  img.src = canvas.toDataURL()
}
