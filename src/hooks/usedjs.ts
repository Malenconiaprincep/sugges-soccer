import { useState, useEffect } from "react"

function useDjs(init: number) {
  const [count, setCount] = useState(init)

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => count - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  return {
    count,
    setCount
  }
}

export default useDjs
