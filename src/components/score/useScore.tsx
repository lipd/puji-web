import { useEffect, useState, RefObject, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'
import axios from 'axios'
import { PlaybackEvent } from 'osmd-audio-player/dist/PlaybackEngine'
import { Score } from 'types'

interface useScoreParams {
  scoreRef: RefObject<HTMLDivElement>
  scoreData: Score | null
}
export const useScore = ({ scoreRef, scoreData }: useScoreParams) => {
  const [rendererLoading, setRendererLoading] = useState(true)
  const [osmd, setOSMD] = useState<null | OSMD>(null)

  const [playerLoading, setPlayerLoading] = useState(true)
  const playerLoaded = useRef(false)
  const engine = useRef(new AudioPlayer())

  const [currentStep, setCurrentStep] = useState(0)
  const [totalStep, setTotalStep] = useState(0)

  useEffect(() => {
    async function init(url: string) {
      const osmd = new OSMD(scoreRef.current as any, {
        backend: 'svg',
        drawTitle: true,
        autoResize: false,
      })

      const xml = await axios.get(url)
      await osmd.load(xml.data)

      osmd.zoom = 0.6
      osmd.render()
      setOSMD(osmd)
      setRendererLoading(false)

      await engine.current.loadScore(osmd as any)

      setTotalStep((engine.current as any).iterationSteps)
      engine.current.on(PlaybackEvent.ITERATION, () => {
        setCurrentStep((engine.current as any).currentIterationStep)
      })

      setPlayerLoading(false)
      playerLoaded.current = true
    }

    if (scoreData) init(scoreData.xmlUrl)

    const engineTarget = engine.current
    return () => {
      if (playerLoaded.current) {
        engineTarget.stop()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreData])

  return {
    renderer: {
      osmd,
      loading: rendererLoading,
    },
    player: {
      engine,
      loading: playerLoading,
      currentStep,
      setCurrentStep,
      totalStep,
    },
  }
}
