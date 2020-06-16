import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()


  // To avoid error message when switch to another page when fetching data
  // will store data across rerender cycles?? 150
  const activeHttpRequest = useRef([])

  const sendRequest = useCallback(async (url: string, method = 'GET', body:any = null, headers = {}) => {
    setIsLoading(true)
    // An Api supported in modern browsers and will add the active http request which will cancel the connect
    const httpAbortCtrl = new AbortController()
    activeHttpRequest.current.push(httpAbortCtrl)

    try {

      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      })
  
      const data = await response.json()

      // when request completed, filter out the controller for this request - the old controller, 
      activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)
  
      if (!response.ok) {   //400 or 500
        throw new Error(data.message)
      }
      setIsLoading(false)
      return data

    } catch (e) {
      setError(e.message)
      setIsLoading(false)
      throw e

    }
   
  }, [])

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    // when return a function here it is executed as a cleanup function before the next time useEffect runs again 
    return () => {
      // activeHttpRequest.current - an array of board controllers
      activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort())
    }  
  }, [])

  return { isLoading, error, sendRequest, clearError }
}