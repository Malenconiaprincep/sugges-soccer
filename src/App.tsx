import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import axios from "axios"
import ReactAudioPlayer from "react-audio-player"

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false))
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false))
    }
  }, [])

  return [playing, toggle, audio]
}

export const useWindowEvent = (event: any, callback: any) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

export const useGlobalMessage = (callback: any) => {
  return useWindowEvent("message", callback)
}

function App() {
  const id = window.location.search.match(/\?id=(.+)/)
  const matchId = id && id[1]
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(5)
  const [data, setData] = useState<any>(null)
  const [playing, toggle, audio] = useAudio(`http://localhost:8888/djs.mp3`)

  const receiveMessage = useCallback(
    (event: any) => {
      if (event.data.method === "WebcastChatMessage") {
        const ans = event.data.content
        console.log(data)
        if (ans === data.notionName) {
          // 回答正确
          alert("回答正确")
          ;(audio as any).pause()
        }
      }
    },
    [data]
  )

  useGlobalMessage(receiveMessage)

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8888/${matchId}.json`,
      responseType: "stream",
    }).then(function (response) {
      setData(response.data)
    })
  }, [matchId])

  useEffect(() => {
    let interval: any = null
    if (data && count) {
      interval = setInterval(() => {
        setCount(count - 1)
        ;(audio as any).play()
      }, 1000)
    } else {
      if (count === 0) {
        setStep(1)
        ;(audio as any).pause()
      }
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [count, data])

  return (
    data && (
      <div className="App">
        <div className="block-two-third">
          {/* <button onClick={() => setStep(1)}>显示答案</button> */}
          <div style={{ height: "120px" }}>
            {step === 0 && <div className="count-down"></div>}
            {step === 1 && (
              <div className="answer">
                <img src={data.notionLogo} />
                <span>{data.notionName}</span>
              </div>
            )}
          </div>
          <ReactAudioPlayer
            src="http://localhost:8888/djs.mp3"
            autoPlay
            controls
            style={{ display: "none" }}
          />

          <div className="field-large">
            <div className="lineup">
              {data.players.map((item: any) => {
                return (
                  <div
                    className="field-player "
                    style={{ left: item.left, top: item.top }}
                  >
                    {step === 1 && (
                      <>
                        <div>
                          <img
                            className="field-avatar animated zoomIn"
                            src={item.img}
                          />
                        </div>
                        <div className="field-name animated zoomIn">
                          <img src={item.teamlogo} className="field-logo" />
                          {item.name}
                        </div>
                      </>
                    )}
                    {step === 0 && (
                      <>
                        <div>
                          <img
                            className="field-teamlogo animated zoomIn"
                            src={item.teamlogo}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default App
