import { useEffect, useState, RefObject } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import axios from 'axios'

interface useRendererParams {
  scoreRef: RefObject<HTMLDivElement>
  xmlUrl: string | null
}
export const useRenderer = ({ scoreRef, xmlUrl }: useRendererParams) => {
  const [rendererLoaded, setRendererLoaded] = useState(false)
  const [osmd, setOSMD] = useState<null | OSMD>(null)

  useEffect(() => {
    async function init(url: string) {
      const osmd = new OSMD(scoreRef.current as any, {
        backend: 'canvas',
        drawTitle: true,
        autoResize: false,
        disableCursor: true,
      })

      const xml = await axios.get(url)
      await osmd.load(xml.data)
      osmd.zoom = 0.3
      osmd.render()
      setOSMD(osmd)
      setRendererLoaded(true)
    }

    if (xmlUrl) init(xmlUrl)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xmlUrl])

  return {
    osmd,
    loaded: rendererLoaded,
  }
}
