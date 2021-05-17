import styled from '@emotion/styled'
import { Card, Form, Input, message, Select } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { UploadChangeParam } from 'antd/lib/upload'
import { SubmitButton } from 'components/button'
import { useState } from 'react'
import { useRequest } from 'hooks/use-request'
import { useHistory } from 'react-router'

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
  const request = useRequest()
  const history = useHistory()

  const handleUpload = (info: UploadChangeParam) => {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log('first', info.file)
    }
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
    const data = { ...values, xmlUrl }
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
      <Dragger {...props} onChange={handleUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击此处或者将乐谱文件拖入这里</p>
        <p className="ant-upload-hint">
          你需要在打谱软件中将乐谱以 xml 格式导出
        </p>
      </Dragger>
      <br />

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
          name="lisences"
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
          <SubmitButton loading={isLoading} htmlType="submit" type="primary">
            发布乐谱
          </SubmitButton>
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
