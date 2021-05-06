import styled from '@emotion/styled'
import { Button, Slider } from 'antd'
import { color } from 'style/color'
import { ReactComponent as PlayIcon } from 'assets/player.svg'
import { ReactComponent as PauseIcon } from 'assets/pause.svg'
import { ReactComponent as ResetIcon } from 'assets/reset.svg'
import { useState } from 'react'
import PlaybackEngine from 'osmd-audio-player'

interface ScorePlayerProps {
  player: {
    loading: boolean
    engine: PlaybackEngine
    currentStep: number
    totalStep: number
    setCurrentStep: (val: number) => void
  }
}
export const ScorePlayer = ({ player }: ScorePlayerProps) => {
  const [playing, setPlaying] = useState(false)
  const [triggered, setTriggered] = useState(false)

  function handleReset() {
    setPlaying(false)
    player.engine.stop()
    player.setCurrentStep(0)
  }

  function handlePause() {
    setPlaying(false)
    player.engine.pause()
  }

  function handlePlay() {
    setPlaying(true)
    setTriggered(true)
    player.engine.play()
  }

  function handleJump(val: number) {
    player.engine.jumpToStep(val)
    player.setCurrentStep(val)
    player.engine.play()
  }

  return (
    <Container>
      <Button type="link" className="button">
        <ResetIcon
          className={`reset-icon${player.loading ? ' disabled' : ''}`}
          onClick={handleReset}
        />
      </Button>
      {playing ? (
        <Button
          className="button"
          disabled={player.loading}
          type="link"
          onClick={handlePause}
        >
          <PauseIcon className="icon" />
        </Button>
      ) : (
        <Button
          className="button"
          disabled={player.loading}
          type="link"
          onClick={handlePlay}
        >
          <PlayIcon className={`icon${player.loading ? ' disabled' : ''}`} />
        </Button>
      )}

      <SliderBox>
        <Slider
          tooltipVisible={false}
          max={player.totalStep}
          value={player.currentStep}
          onChange={handleJump}
          disabled={!triggered}
        />
      </SliderBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  padding: 0 4.5rem;
  align-items: center;
  background: ${color.cyan};

  .button {
    padding: 0;
  }

  .icon {
    fill: ${color.primary};
    width: 3rem;
    height: 3rem;
  }

  .reset-icon {
    fill: ${color.primary};
    width: 2.5rem;
    height: 3rem;
    margin-right: 0.8rem;
  }

  .disabled {
    fill: ${color.grey};
  }

  .ant-slider-rail {
    background: #ebebeb;
  }

  .ant-slider-track {
  }
`

const SliderBox = styled.div`
  flex: 1;
  margin-left: 1.5rem;
`
