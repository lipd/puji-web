import { Form, Input, message } from 'antd'
import { useAuth } from 'hooks/use-auth'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { AuthForm } from 'types'
import { LongButton } from '.'

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const history = useHistory()

  const handleSubmit = async (values: AuthForm) => {
    setIsLoading(true)
    try {
      await register(values)
      message.success('注册成功')
      history.replace('/')
    } catch (err) {
      if (err.response.data.message) {
        message.error(err.response.data.message)
      } else {
        message.error('注册失败')
      }
    }
    setIsLoading(false)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
