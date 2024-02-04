import { useState, useEffect } from "react"

function useDjs(init: number, imagesPreloaded?: boolean, loaded?: boolean) {
  const [count, setCount] = useState(init)

  useEffect(() => {
    if (!imagesPreloaded || !loaded) {
      return
    }
    let timer = setInterval(() => {
      if (count - 1 < 0) {
        setCount((count) => count)
      } else {
        setCount((count) => count - 1)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  return {
    count,
    setCount,
  }
}

export default useDjs
