import styled from '@emotion/styled'
import { ReactComponent as Icon } from 'assets/search.svg'
import { useState } from 'react'

const REMIND_TEXT = '乐谱名称 & 作者'

export const Searcher = () => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <Container>
      <IconBox>
        <SearchIcon fill={isFocus ? '#5372ff' : '#707070'} />
      </IconBox>
      <Input
        type="text"
        placeholder={REMIND_TEXT}
        onFocus={(e) => {
          e.target.placeholder = ''
          setIsFocus(true)
        }}
        onBlur={(e) => {
          e.target.placeholder = REMIND_TEXT
          setIsFocus(false)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const IconBox = styled.div`
  margin-left: 1rem;
  position: absolute;
  display: flex;
  align-items: center;
  height: 3.5rem;
  width: 2rem;
`

const SearchIcon = styled(Icon)`
  display: block;
  width: 1.8rem;
  height: 1.8rem;
`

const Input = styled.input`
  display: block;
  height: 3.5rem;
  width: 20rem;
  border: 1px solid #ebebeb;
  border-radius: 3.5rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 3.5rem;
  background: #f6f6f6;

  :focus {
    width: 30rem;
    border: 1px solid #5372ff;
    background: white;
  }
`
