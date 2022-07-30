import React, { useCallback, useEffect, useState } from "react"
import { Modal } from "antd"
import "antd/dist/antd.css"
import "./App.css"
import axios from "axios"
import ReactAudioPlayer from "react-audio-player"

const questions = [
  "iceland",
  "france",
  "germany",
  "Netherlands",
  "brazil",
  "Belgium",
  "Argentina",
  "england",
  "spain",
  "portugal",
  "Mexi",
  "italy",

  "poland",
  "iceland",
  "canada",

  "greece",

  "sweden",
  "norway",
  "china",
  "czech",
  "barcelona",
  "mancity",
  "manchester united",
  "arsenal",
  "liverpool",
  "tottenham",
  "Dortmund",
  "chelse",
  "bayern",
  "real madrid",
  "germain",
  "demadrid",
  "inter",
  "juventus",
  "milan",
  "sevilla",
  "atalanta",
  "leicester",
  "sociedad",
  "villarreal",
  "west ham",
  "leverkusen",
  "lazio",
  "roma",
  "bilbao",
  "betis",
  "ajax",
  "aston",
  "everton",
  "lyonnais",
  "benfica",
  "porto",
  "hoffenheim",
  "wolfsburg",
  "espanyol",
  "leeds",
  "wanderers",
  "fiorentina",
  "frankfurt",
  "lille",
  "juniors",
  "brugge",
  "udinese",
  "galatasaray",
  "fulham",
  "mallorca",
  "bordeaux",
  "celtic",

  "states",
  "wales",
  "denmark",
  "romania",
  "ukraine",
]

questions.sort((a, b) => {
  return Math.random() > 0.5 ? -1 : 1 // 如果a<b不交换，否则交换，即升序排列；如果a>b不交换，否则交换，即将序排列
})

console.log(questions)

function preload(questions: any) {
  for (let i = 0; i < questions.length; i++) {
    axios({
      method: "get",
      url: `/data/${questions[i]}/${questions[i]}.json`,
      responseType: "stream",
    }).then(function (response) {
      const notionlogo = response.data.notionLogo
      const playerimgs = response.data.players.map((item: any) => item.img)
      const teamlogos = response.data.players.map((item: any) => item.teamlogo)

      const imgs = [notionlogo, ...playerimgs, ...teamlogos]

      for (let i = 0; i < imgs.length; i++) {
        const image = new Image()
        image.src = imgs[i]
      }
      console.log(imgs)
    })
  }
}

preload(questions)

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

function getMatchKey(questions: string[], startIndex: number) {
  if (questions) {
    if (questions[startIndex]) {
      const value = questions[startIndex]
      startIndex++
      return value
    } else {
      startIndex = 0
      return questions[startIndex]
    }
  }
  return ""
}

const countValue = 25
const waitSuccess = 8

function App() {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(countValue)
  const [data, setData] = useState<any>(null)
  // const [playing, toggle, audio] = useAudio(`/data/djs.mp3`)
  const [visible, setVisible] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [startIndex, setStartIndex] = useState(0)

  const getMatchKey = useCallback(
    (questions: string[], startIndex: number) => {
      if (questions) {
        if (questions[startIndex]) {
          const value = questions[startIndex]
          startIndex++
          return value
        } else {
          startIndex = 0
          return questions[startIndex]
        }
      }
      return ""
    },
    [startIndex]
  )

  const matchKey = getMatchKey(questions, startIndex)

  const receiveMessage = useCallback(
    (event: any) => {
      if (step === 1) return
      for (let i = 0; i < event.data.length; i++) {
        let item = event.data[i]
        if (item && item.method === "WebcastChatMessage") {
          const ans = item.content
          if (ans === item.notionName) {
            // 回答正确
            setAnswer(item.nickname)
            setVisible(true)
            setCount(0)

            setTimeout(() => {
              // ;(audio as any).pause()
              setVisible(false)
            }, 3000)
            break
          }
        }
      }
    },
    [data, visible, step]
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
          if (startIndex === questions.length) {
            setStartIndex(0)
          } else {
            setStartIndex((startIndex) => startIndex + 1)
          }
          setStep(0)
          setCount(countValue)
        }, waitSuccess * 1000)
        // ;(audio as any).pause()
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
          <div style={{ height: "80px", marginBottom: "20px" }}>
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
        {/* <div className="title">
          <span style={{ fontSize: "20px" }}>(未成年禁止打赏)</span>
        </div> */}
        <Modal visible={visible} footer={null} closable={false} centered={true}>
          <div className="modal-show">
            <div className="right"></div>
            <p className="congra">
              恭喜<span style={{ color: "red" }}>{answer}</span>回答正确
            </p>
          </div>
        </Modal>
      </div>
    )
  )
}

export default App
