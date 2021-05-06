import styled from '@emotion/styled'
import { RefObject } from 'react'
import { color } from 'style/color'

interface ScoreProp {
  scoreRef: RefObject<HTMLDivElement>
}
export const Score = ({ scoreRef }: ScoreProp) => {
  return (
    <Container>
      <Paper>
        <div className="canvas" ref={scoreRef}></div>
      </Paper>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${color.greyLight};
  display: flex;
  justify-content: center;
`

const Paper = styled.div`
  width: 70rem;
  background: white;
`
