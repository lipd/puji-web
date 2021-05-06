import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import styled from '@emotion/styled'
import { RefObject } from 'react'
import { color } from 'style/color'
import { Skeleton } from 'antd'

interface ScoreProp {
  scoreRef: RefObject<HTMLDivElement>
  renderer: {
    osmd: OSMD | null
    loading: boolean
  }
}
export const Score = ({ scoreRef, renderer }: ScoreProp) => {
  return (
    <Container>
      <Paper>
        {renderer.loading && (
          <Skeleton paragraph={{ rows: 16 }} active className="skeleton" />
        )}
        <div className="canvas" ref={scoreRef}></div>
      </Paper>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${color.greyLight};
  display: flex;
  justify-content: center;

  .skeleton {
    padding: 2rem;
  }
`

const Paper = styled.div`
  width: 70rem;
  background: white;
  min-height: calc(100vh - 10rem);
`
