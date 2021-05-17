import styled from '@emotion/styled'
import { Button, Input } from 'antd'
import { useRef, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { color } from 'style/color'

interface FiledProps {
  label: string
  currentValue: string
  defaultValue: string
  onUpdate: (value: string) => void
}
export const Filed = ({
  label,
  currentValue,
  defaultValue,
  onUpdate,
}: FiledProps) => {
  const [displayTrigger, setDisplayTrigger] = useState(false)
  const [active, setActive] = useState(false)
  const inputRef = useRef<any>()

  const handleDisactive = () => {
    setDisplayTrigger(false)
    setActive(false)
  }

  const handleUpdate = () => {
    onUpdate(inputRef.current.state.value)
    setDisplayTrigger(false)
    setActive(false)
  }

  return (
    <Container>
      {!active && (
        <FiledBody
          onMouseEnter={() => setDisplayTrigger(true)}
          onMouseLeave={() => {
            setDisplayTrigger(false)
          }}
        >
          <Label className="bold">{label}</Label>
          <Content className="bold">{currentValue}</Content>
          {displayTrigger && (
            <Trigger onClick={() => setActive(true)}>
              <EditOutlined />
              修改
            </Trigger>
          )}
        </FiledBody>
      )}
      {active && (
        <FiledEditor>
          <Input defaultValue={defaultValue} ref={inputRef} />
          <ButtonGroup>
            <Button
              type="primary"
              style={{ marginRight: '2rem' }}
              onClick={handleUpdate}
            >
              更新
            </Button>
            <Button onClick={handleDisactive}>取消</Button>
          </ButtonGroup>
        </FiledEditor>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: 2rem 0;
`

const FiledBody = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`

const Label = styled.span``

const Content = styled.span``

const Trigger = styled.span`
  fill: #8b9dff;
  color: #8b9dff;
  margin-left: 2rem;

  :hover {
    fill: ${color.primary};
    color: ${color.primary};
  }
`

const FiledEditor = styled.div``

const ButtonGroup = styled.div`
  padding: 1rem 0;
`
