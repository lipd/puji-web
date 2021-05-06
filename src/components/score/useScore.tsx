import { useEffect, useState, RefObject } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'
import axios from 'axios'
import { PlaybackEvent } from 'osmd-audio-player/dist/PlaybackEngine'

interface useScoreParams {
  scoreRef: RefObject<HTMLDivElement>
}
export const useScore = ({ scoreRef }: useScoreParams) => {
  const [rendererLoading, setRendererLoading] = useState(true)
  const [renderer, setRenderer] = useState<null | OSMD>(null)

  const [playerLoading, setPlayerLoading] = useState(true)
  const [engine] = useState(() => new AudioPlayer())
  const [currentStep, setCurrentStep] = useState(0)
  const [totalStep, setTotalStep] = useState(0)

  useEffect(() => {
    async function init() {
      const osmd = new OSMD(scoreRef.current as any, {
        backend: 'svg',
        drawTitle: true,
        autoResize: false,
      })

      const xml = await axios.get('http://localhost:3000/MozaVeilSample.xml')
      await osmd.load(xml.data)

      osmd.zoom = 0.6
      osmd.render()
      setRenderer(osmd)
      setRendererLoading(false)

      await engine.loadScore(osmd as any)

      setTotalStep((engine as any).iterationSteps)
      engine.on(PlaybackEvent.ITERATION, () => {
        setCurrentStep((engine as any).currentIterationStep)
      })

      setPlayerLoading(false)
    }
    init()
  }, [])

  return {
    osmd: {
      renderer,
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
