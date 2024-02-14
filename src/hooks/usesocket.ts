import { useEffect, useRef, useState } from "react"

const useSocket = (
  socketUrl: string,
  reloadSocket: boolean,
  setReloadSocket: any,
  socketRef: any
) => {
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    if (reloadSocket) {
      socketRef.current.close()
      socketRef.current = null
    }
    if (!socketRef.current) {
      setTimeout(() => {
        // 只在组件第一次渲染时创建 Socket 实例
        const newSocket = new WebSocket(socketUrl)
        socketRef.current = newSocket

        newSocket.addEventListener("open", function () {
          console.log("Connected to Server")
          newSocket.send("连接 socket, footBall")
        })

        setSocket(newSocket)
      }, 500)
      setReloadSocket(false)
    }

    // 在组件卸载时，断开 Socket 连接
    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [socketUrl, reloadSocket])

  return socket
}

export default useSocket
