import React, { useEffect } from 'react'

export const useMount = (cb: React.EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, [])
}
