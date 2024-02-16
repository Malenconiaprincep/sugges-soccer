import { useEffect } from "react"
import { startConnection } from "innoz-bili-util"
import { IFROM, convertMessage } from "../lib/convert"

export const useBiliDanmu = (callback: any, data: any) => {
  useEffect(() => {
    const start = async () => {
      startConnection({
        roomId: "31904110",
        key: "eUDhpCCmjM1V6hxljAYTomzr-HE27vY7smMyd1f7njknCItcS-46Ei9fWn1EbqoKyDV4PpiM-faGBPI9iMPOyWcnnnBhphE1ovdESmUS7n8c83_o2PIt1-IYxnbuuOJ-BOF2QwSp8Xp5ejjln0jstJRx0p5ne6zIkSAdfcMemqj_kSdbFQAMU1enfkg=",
        uid: 413782120,
        onMessage: async (msg) => {
          const message = convertMessage(IFROM.bili, msg)
          if (message && callback) {
            callback({
              type: "chat",
              data: message,
            })
          }
        },
      })
    }
    start()
  }, [data, callback])
}
