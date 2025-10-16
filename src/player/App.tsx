import React, { useCallback, useEffect, useRef, useState } from "react"
import { Modal } from "antd"
import "antd/dist/reset.css"
import "./App.css"
import axios from "axios"
// import ReactAudioPlayer from "react-audio-player"
import useDjs from "../hooks/usedjs"
// import Demo from "./demo"
import useImagePreloader from "../hooks/useimagepreloader"

const players: any[] = [
  "Messi",
  "Lewandowski",
  "Salah",
  "De Bruyne",
  "dos Santos Aveiro",
  "Mbappé",
  "Benzema",
  "Kanté",
  "van Dijk",
  "da Silva Santos Jr.",
  "Neuer",
  "Mané",
  "Ramses Becker",
  "Santana de Moraes",
  "Son",
  "Kane",
  "Kimmich",
  "Oblak",
  "Courtois",
  "Venancio Casimiro",
  "Cavaco Cancelo",
  "Gato Alves Dias",
  "Navas",
  "Aoás Corrêa",
  "Donnarumma",
  "Goretzka",
  "Haaland",
  "ter Stegen",
  "Modrić",
  "Kroos",
  "Henrique Tavares",
  "Robertson",
  "Alexander-Arnold",
  "Sterling",
  "Carvalho e Silva",
  "Hernández Cascante",
  "De Gea Quintana",
  "Borges Fernandes",
  "Lloris",
  "Verratti",
  "Müller",
  "Dybala",
  "de Jong",
  "da Silva",
  "Lukaku",
  "Rüdiger",
  "Mendy",
  "Alcântara",
  "Mahrez",
  "Laporte",
  "Pogba",
  "Vardy",
  "Sané",
  "Nkunku",
  "Škriniar",
  "Szczęsny",
  "Immobile",
  "Koulibaly",
  "Suárez",
  "Parejo Muñoz",
]

const questions = [...players]

// const questions = ["real madrid"]

const host = "http://localhost"

questions.sort((a, b) => {
  return Math.random() > 0.5 ? -1 : 1 // 如果a<b不交换，否则交换，即升序排列；如果a>b不交换，否则交换，即将序排列
})

// console.log(questions)

async function preload(questions: any) {
  let imgs: any[] = []

  for (let i = 0; i < questions.length; i++) {
    const res = await axios(`/players/${questions[i]}/${questions[i]}.json`)
    const avatar = res.data.avatar
    const clubimgs = res.data.clubs.map((item: any) => item.img)
    imgs = [avatar, ...clubimgs]
  }

  return imgs
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

const countValue = 2
const waitSuccess = 2

// const countValue = 2
// const waitSuccess = 2

function App() {
  const [load, setLoad] = useState(false)
  const [preloadSrcList, setPreloadSrcList] = useState([])
  const { imagesPreloaded } = useImagePreloader(preloadSrcList)
  const [step, setStep] = useState(0)
  const { count, setCount } = useDjs(countValue)
  const [data, setData] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [answer, setAnswer] = useState<string>("")
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const res: any = await preload(questions)
      setPreloadSrcList(res)
      setLoad(true)
      return res
    }

    fetch()
  }, [])

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
          const ans = item.content.toUpperCase()
          if (
            ans === data.notionName.replace(/\s/g, "").toUpperCase() ||
            ans === data.notionName.toUpperCase()
          ) {
            // 回答正确
            setAnswer(item.nickname)
            setVisible(true)
            setCount(0)
            setTimeout(() => {
              // const audio = document.querySelector("audio")
              // ;(audio as any).pause()
              // ;(audio as any).currentTime = 0
              // ;(audio as any).src = ""

              setVisible(false)
              setAnswer("")
            }, 6000)
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
      url: `/players/${matchKey}/${matchKey}.json`,
      responseType: "stream",
    }).then(function (response) {
      setData(response.data)
    })
  }, [matchKey])

  useEffect(() => {
    if (count === 0) {
      // 出答案
      setStep(1)
      setTimeout(() => {
        // 等一段时间下一题
        setStep(2)
        if (startIndex === questions.length) {
          setStartIndex(1)
        } else {
          setStartIndex((startIndex) => startIndex + 1)
        }
        setStep(0)
        setCount(countValue)
      }, waitSuccess * 1000)
      // ;(audio as any).pause()
    }
  }, [count])

  if (!imagesPreloaded && !load) {
    return <p>Preloading Assets</p>
  }

  return (
    data && (
      <div className="App">
        <div className="block-two-third">
          <div
            style={{
              height: "80px",
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {step === 0 && <div className="count-down">{count}</div>}
            {step === 1 && (
              <div className="answer">
                <div className="top"></div>
                <div className="center">
                  <span>{data.familyName}</span>
                </div>
                <div className="top"></div>
                <img src={data.avatar} />
              </div>
            )}
          </div>
          <div className="field-large1">
            <div className="field-item">
              {data.clubs.map((item: any) => {
                return (
                  <div className="field-club" key={item.img}>
                    <img
                      className="field-teamlogo animated zoomIn"
                      src={item.clubimg}
                    />
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
          <div
            style={{
              width: "180px",
              height: "15px",
              background: "rgba(196, 247, 82)",
              position: "absolute",
              left: "0",
              top: "0",
            }}
          ></div>
          <div className="modal-show">
            <div>GOAL!</div>
            <p className="congra">
              恭喜
              <span className="res">
                <span className="name">
                  {answer && answer.length > 15
                    ? answer.slice(0, 10) + "..."
                    : answer}
                </span>
              </span>
              回答正确
            </p>
          </div>
        </Modal>
        {/* <button onClick={() => setStep(1)}>显示答案</button> */}
        {/* <Demo answer={answer} /> */}
        {/* <button
          onClick={() => {
            receiveMessage({
              data: [
                {
                  content: "首尔 fc",
                  method: "WebcastChatMessage",
                  nickname: "1111",
                },
              ],
            })
          }}
        >
          测试
        </button> */}
      </div>
    )
  )
}

export default App
