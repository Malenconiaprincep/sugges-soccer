import { useEffect } from "react"
import { IFROM, convertMessage } from "../lib/convert"

export const useDouyin = (socketRef: any, socket: any, callback: any) => {
  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", (event: any) => {
        const message = convertMessage(IFROM.douyin, event.data)
        if (message) {
          callback({
            type: message.type,
            data: message,
          })
        }
      })
    }
  }, [socket])
}
