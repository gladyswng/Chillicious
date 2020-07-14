import React, { createContext } from 'react'
export const ScriptLoadContext = createContext({
  scriptLoaded: false,
  scriptLoadError: null
})

