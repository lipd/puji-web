import React, { useEffect } from 'react'

export const useMount = (cb: React.EffectCallback) => {
  useEffect(cb, [])
}
