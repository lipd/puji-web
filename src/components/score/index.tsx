import styled from '@emotion/styled'
import { LegacyRef, useEffect, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import { color } from 'style/color'

export const Score = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const osmd = new OSMD(canvasRef.current as HTMLDivElement, {
      backend: 'svg',
      drawTitle: true,
      autoResize: false,
    })
    osmd.load('http://localhost:3000/MozaVeilSample.xml').then(() => {
      // osmd.Sheet.Instruments[1].Visible = false
      osmd.zoom = 0.6
      osmd.render()
    })
  }, [])

  return (
    <Container>
      <Box>
        <div className="canvas" ref={canvasRef}></div>
      </Box>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100%;
  background-color: ${color.greyLight};
  display: flex;
  justify-content: center;
`

const Box = styled.div`
  width: 70rem;
  background: white;
`
