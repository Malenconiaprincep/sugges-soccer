import { useEffect, useRef, useState } from "react"

const useSocket = (socketUrl: string) => {
  const [socket, setSocket] = useState<any>(null)
  const socketRef = useRef<any>(null)

  useEffect(() => {
    // 只在组件第一次渲染时创建 Socket 实例
    if (!socketRef.current) {
      const newSocket = new WebSocket(socketUrl)
      socketRef.current = newSocket

      newSocket.addEventListener("open", function () {
        console.log("Connected to Server")
        newSocket.send("连接 socket, footBall")
      })

      setSocket(newSocket)
    }

    // 在组件卸载时，断开 Socket 连接
    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [socketUrl])

  return socket
}

export default useSocket
