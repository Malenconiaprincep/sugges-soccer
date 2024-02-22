import { useState, useEffect } from "react"

function useDjs(init: number, imagesPreloaded?: boolean, loaded?: boolean) {
  const [count, setCount] = useState(init)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (!imagesPreloaded || !loaded) {
      return
    }
    const newTimer = setInterval(() => {
      if (count - 1 < 0) {
        if (count - 1 < 0) {
          setCount(0)
        } else {
          setCount((count) => count)
        }
      } else {
        setCount((count) => count - 1)
      }
    }, 1000)
    setTimer(newTimer)
  }

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  useEffect(() => {
    return () => {
      pauseTimer()
    }
  }, [])

  return {
    count,
    setCount,
    startTimer,
    pauseTimer,
    timer,
  }
}

export default useDjs
