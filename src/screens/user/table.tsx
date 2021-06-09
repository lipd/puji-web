import styled from '@emotion/styled'
import { Card, message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useAuth } from 'hooks/use-auth'
import userOnline from 'assets/user-online.svg'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { User } from 'types'
import { Filed } from 'components/form/filed'
import { useRequest } from 'hooks/use-request'
import { constants } from 'utils/constants'

export const Table = () => {
  const { user, setUser } = useAuth()
  const request = useRequest()

  const handleUpdateAvatar = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      message.success('头像上传成功')
      const { url } = info.file.response
      const newUser = { ...user, avatar: url }
      setUser(newUser as User)
    } else if (info.file.status === 'error') {
      message.error('上传失败')
    }
  }

  const handleUpdateName = (value: string) => {
    request({
      url: `/users/${(user as User)._id}`,
      method: 'PATCH',
      data: {
        name: value,
      },
    })
      .then(() => {
        setUser({ ...(user as User), name: value })
        message.success('名称已修改')
      })
      .catch(() => {
        message.error('名称修改失败')
      })
  }

  const handleUpdatePassword = (value: string) => {
    request({
      url: `/users/${(user as User)._id}`,
      method: 'PATCH',
      data: {
        password: value,
      },
    })
      .then(() => {
        message.success('密码已修改')
      })
      .catch(() => {
        message.error('密码修改失败')
      })
  }

  return (
    <Container>
      {user && (
        <>
          <UploaderBox url={user.avatar || ''}>
            <ImgCrop rotate>
              <Upload
                name="file"
                headers={{ authorization: `Bearer ${user.token as string}` }}
                action={`${constants.baseUrl}/upload/avata"`}
                showUploadList={false}
                onChange={handleUpdateAvatar}
              >
                <Uploader>
                  <p>点击更换头像</p>
                </Uploader>
              </Upload>
            </ImgCrop>
          </UploaderBox>
          <Filed
            label="用户名："
            currentValue={user.name}
            defaultValue={user.name}
            onUpdate={handleUpdateName}
          />
          <Filed
            label="密码："
            currentValue={'********'}
            defaultValue={''}
            onUpdate={handleUpdatePassword}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled(Card)`
  margin: 4rem 0;
  width: 80rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;

  .ant-form-item-label {
    font-weight: 500;
  }
`

interface AvatarProps {
  url: string
}
const UploaderBox = styled.div<AvatarProps>`
  width: 10rem;
  height: 10rem;
  margin: 1rem 0 3rem;
  border-radius: 1rem;
  background: url(${(props) => props.url || userOnline}) no-repeat;
  background-size: 10rem;
`

const Uploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  background: black;
  opacity: 50%;

  p {
    color: white;
    margin: 0;
  }
`
