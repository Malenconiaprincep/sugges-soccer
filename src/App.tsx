import React, { useCallback, useEffect, useState } from "react"
import { Modal } from "antd"
import "antd/dist/antd.css"
import "./App.css"
import axios from "axios"
import ReactAudioPlayer from "react-audio-player"

const questions = [
  "Argentina",
  "Belgium",
  "brazil",
  "canada",
  "china",
  "czech",
  "denmark",
  "england",
  "france",
  "germany",
  "greece",
  "iceland",
  "italy",
  "Mexi",
  "Netherlands",
  "norway",
  "poland",
  "portugal",
  "romania",
  "spain",
  "states",
  "sweden",
  "ukraine",
  "wales",
]

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

function getMatchKey(questions: string[]) {
  if (questions) {
    const randomIndex = Math.floor(Math.random() * questions.length)
    const matchKey = questions[randomIndex]
    return matchKey
  }
  return ""
}

const countValue = 5

function App() {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(countValue)
  const [data, setData] = useState<any>(null)
  // const [playing, toggle, audio] = useAudio(`/data/djs.mp3`)
  const value = getMatchKey(questions)
  const [matchKey, setMatchKey] = useState(value)
  const [visible, setVisible] = useState(false)
  const [answer, setAnswer] = useState(null)

  const receiveMessage = useCallback(
    (event: any) => {
      for (let i = 0; i < event.data.length; i++) {
        let item = event.data[i]
        if (item && item.method === "WebcastChatMessage") {
          const ans = item.content
          if (ans === data.notionName) {
            // 回答正确
            setAnswer(item.nickname)
            setVisible(true)

            setTimeout(() => {
              // ;(audio as any).pause()
              setVisible(false)
              setCount(0)
              setStep(1)
              console.log(item.nickname)
            }, 3000)
            break
          }
        }
      }
    },
    [data]
  )

  useGlobalMessage(receiveMessage)

  useEffect(() => {
    axios({
      method: "get",
      url: `/data/${matchKey}/${matchKey}.json`,
      responseType: "stream",
    }).then(function (response) {
      setData(response.data)
    })
  }, [matchKey])

  useEffect(() => {
    let interval: any = null
    if (data && count) {
      interval = setInterval(() => {
        setCount(count - 1)
        // ;(audio as any).play()
      }, 1000)
    } else {
      if (count === 0) {
        setStep(1)
        setTimeout(() => {
          setStep(0)
          setCount(countValue)
          setMatchKey(getMatchKey(questions))
        }, 10000)
        // ;(audio as any).pause()
      }
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [count, data])

  return (
    data && (
      <div className="App">
        <div className="title">
          看图猜球队
        </div>
        <div className="block-two-third">
          {/* <button onClick={() => setStep(1)}>显示答案</button> */}
          <div style={{ height: "120px" }}>
            {step === 0 && <div className="count-down">{count}</div>}
            {step === 1 && (
              <div className="answer">
                <img src={data.notionLogo} />
                <span>{data.notionName}</span>
              </div>
            )}
          </div>
          {/* <ReactAudioPlayer
            src="http://localhost:8888/djs.mp3"
            autoPlay
            controls
            style={{ display: "none" }}
          /> */}

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
        <Modal visible={visible} footer={null} closable={false} centered={true}>
          <div className="modal-show">
            <div className="right"></div>
            <p>
              恭喜<span style={{ color: "red" }}>{answer}</span>回答正确
            </p>
          </div>
        </Modal>
      </div>
    )
  )
}

export default App
