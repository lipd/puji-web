import styled from '@emotion/styled'
import { Button, Card, Form, Input, message, Select } from 'antd'
import { InboxOutlined, PictureOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
// @ts-ignore
import { UploadChangeParam } from 'antd/lib/upload'
import { useEffect, useRef, useState } from 'react'
import { useRequest } from 'hooks/use-request'
import { useHistory } from 'react-router'
import { useRenderer } from 'components/score/useRenderer'
import { color } from 'style/color'
import { uploadCover } from './upload-cover'

const { Option } = Select

interface FormValues {
  name: string
  author: string
  description: string
  instruments: string[]
  genres: string[]
  licenses: string[]
}

const licenceOptions = [
  { label: '允许修改', value: 'to-change' },
  { label: '允许商用', value: 'to-commertial' },
  { label: '允许分享', value: 'to-share' },
  { label: '允许个人使用', value: 'to-personal' },
]

const instrumentOptions = [
  { label: '键盘', value: 'keyboard' },
  { label: '弦乐', value: 'string' },
  { label: '管乐', value: 'wind' },
  { label: '打击乐', value: 'percussion' },
  { label: '声乐', value: 'vocal' },
  { label: '乐队', value: 'band' },
  { label: '其他', value: 'other' },
]

const genreOptions = [
  { label: '古典', value: 'classical' },
  { label: '流行', value: 'pop' },
  { label: '爵士', value: 'jazz' },
  { label: '乡村', value: 'country' },
  { label: '摇滚', value: 'rock' },
  { label: '民乐', value: 'chinese' },
  { label: '世界音乐', value: 'world-music' },
  { label: '其他', value: 'other' },
]

const props = {
  name: 'file',
  multiple: false,
  action: 'http://localhost:3005/upload/score',
  maxCount: 1,
}

export const Table = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [xmlUrl, setXmlUrl] = useState<string | null>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const request = useRequest()
  const history = useHistory()
  const scoreRef = useRef<any>()
  const { loaded } = useRenderer({ scoreRef, xmlUrl })

  useEffect(() => {
    if (!loaded) return

    const canvas = document.getElementById(
      'osmdCanvasVexFlowBackendCanvas1',
    ) as HTMLCanvasElement

    uploadCover({ canvas, request }, (res) => {
      const { url } = res.data
      message.success('成功生成封面')
      setImgUrl(url)
    })
  }, [loaded, request])

  const handleUpload = (info: UploadChangeParam) => {
    const { status } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} 已经上传`)
      setXmlUrl(info.file.response.url)
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`)
    }
  }

  const handleSubmit = async (values: FormValues) => {
    if (!xmlUrl) {
      return message.error('请先上传乐谱文件')
    }
    if (!imgUrl) {
      return message.error('需要生成封面')
    }
    const data = { ...values, xmlUrl, cover: imgUrl }
    setIsLoading(true)
    try {
      await request({
        url: '/scores',
        method: 'POST',
        data,
      })
      history.push('/')
    } catch (err) {
      message.error(err.message)
    }
    setIsLoading(false)
  }

  return (
    <Container>
      {!loaded && (
        <Dragger {...props} onChange={handleUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击此处或者将乐谱文件拖入这里</p>
          <p className="ant-upload-hint">
            你需要在打谱软件中将乐谱以 xml 格式导出
          </p>
        </Dragger>
      )}

      <Preview active={loaded}>
        {!loaded && (
          <Mask>
            <div>
              <PictureIcon />
              <MaskTitle>乐谱与封面预览</MaskTitle>
              <MaskSub>上传乐谱文件后自动生成</MaskSub>
            </div>
          </Mask>
        )}
        <ScoreBox>
          <Score ref={scoreRef} />
        </ScoreBox>
        <PictureBox>{imgUrl && <Picture src={imgUrl} />}</PictureBox>
      </Preview>

      <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item
          colon={true}
          label="乐谱名称"
          name="name"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="作者姓名"
          name="author"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="作品描述 (可选)" name="description">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        <Form.Item label="乐器" name="instruments">
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择乐谱中使用的乐器"
          >
            {instrumentOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="风格" name="genres">
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择乐谱所属的音乐风格"
          >
            {genreOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="许可"
          name="licenses"
          initialValue={[
            'to-change',
            'to-commertial',
            'to-share',
            'to-personal',
          ]}
        >
          <Select mode="multiple" allowClear placeholder="请选择许可证">
            {licenceOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <ButtonGroup>
            <SubmitButton loading={isLoading} htmlType="submit" type="primary">
              发布乐谱
            </SubmitButton>
            <CancelButton
              onClick={() => {
                window.location.reload()
              }}
            >
              重新填写
            </CancelButton>
          </ButtonGroup>
        </Form.Item>
      </Form>
    </Container>
  )
}

const Container = styled(Card)`
  margin: 4rem 0;
  width: 80rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;

  .ant-card-body {
    padding-bottom: 0rem;
  }

  .ant-form-item-label {
    font-weight: 500;
  }
`

interface PreviewProps {
  active: boolean
}
const Preview = styled.div<PreviewProps>`
  display: flex;
  height: ${(props) => (props.active ? '49.5rem' : '18rem')};
  position: relative;
  margin: 2rem 0;
  overflow: hidden;
`

const Mask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 18rem;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
`

const PictureIcon = styled(PictureOutlined)`
  display: block;
  font-size: 3.6rem;
  color: #7e9aff;
  margin-bottom: 2.5rem;
`

const MaskTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
`

const MaskSub = styled.p`
  color: rgba(0, 0, 0, 0.45);
  margin: 0.5rem 0 0;
`

const ScoreBox = styled.div`
  flex: 1;
  height: 100%;
  background: ${color.greyLight};
  overflow: auto;
`

const Score = styled.div`
  width: 35rem;
  background: white;
`

const PictureBox = styled.div`
  flex: 1;
  height: 100%;
  background: ${color.cyan};
`

const Picture = styled.img`
  width: 100%;
  height: 49.5rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubmitButton = styled(Button)`
  display: block;
  width: 50%;
  border-radius: 2rem;
`

const CancelButton = styled(Button)`
  display: block;
  border-radius: 2rem;
  margin-left: 1rem;
  color: #ef422c;
  border: 1px solid #ef422c;
  :hover {
    color: red;
    border: 1px solid red;
    font-weight: 500;
  }
`
