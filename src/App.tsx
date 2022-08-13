import React, { useCallback, useEffect, useRef, useState } from "react"
import { Modal } from "antd"
import "antd/dist/antd.css"
import "./App.css"
import axios from "axios"
// import ReactAudioPlayer from "react-audio-player"
import useDjs from "./hooks/usedjs"
// import Demo from "./demo"
import useImagePreloader from "./hooks/useimagepreloader"

const teams: any[] = [
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
  "states",
  "wales",
  "denmark",
  "poland",
  "iceland",
  "canada",
  "romania",
  "greece",
  "ukraine",
  "sweden",
  "norway",
  "china",
  "czech",
  "austria",
  "scotland",
  "ireland",
  "hungary",
  "finland",
  "northern ireland",
  "australia",
  "zealand",
  "japan",
  "korea",
  "Uruguay",
  "Croatia",
  "Cameroon",
  "Ecuador",
  "Iran",
]

const clubs = [
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
  "plate",
  "napoli",
  "sampdoria",
  "leipzig",
  "nottingham",
  "psv",
  "marseille",
  "schalke",
  "empoli",
  "feyenoord",
  "brentford",
  "norwich",
  "watford",
  "southampton",
  "sunderland",
  "freiburg",
  "monaco",
  "valencia",
  "crystal",
  "rennais",
  "Flamengo",
  "olympiacos",
  "levante",
  "getafe",
  "nice",
  "osasuna",
  "celta",
  "mineiro",
  "torino",
  "racing",
  "montpellier",
  "fenerbahce",
  "strasbourg",
  "boca",
  "sassuolo",
  "Palmeiras",
  "bologna",
  "verona",
  "sparta",
  "stuttgart",
  "augsburg",
  "elche",
  "vallecano",
  "sheffield",
  "Corinthians",
  "berlin",
  "santos",
  "cagliari",
  "paulo",
  "celtic",
  "angeles",
  "alkmaar",
  "brestois",
  "reims",
  "bournemouth",
  "istanbul",
  "salzburg",
  "zagreb",
  "kobenhavn",
  "bochum",
  "bielefeld",
  "venezia",
  "blackburn",
  "hamburger",
  "middlesbrough",
  "kawasaki",
  "vissel",
  "yokohama",
  "Málaga",
  "hyundai",
  "jeonbuk",
  // zhongchao
  "shandong",
  "shanghai",
  "beijing",
  "shenhua",
  "yatai",
  "shenzhen",
  "wuhan",
  "guangzhouCity",
  "henan",
  "dalian",
  "shijiazhuang",
  "tianjin",
  "qingdao",
  "guangzhouFc",
  "chongqing",
  "hebei",
  "wuhansanzhen",
  "azul",
  "hilal",
  "kyiv",
  "eibar",
  "genoa",
  "racingclub",
  "angerssco",
  "independiente",
  "werder",
  "troyes",
  "fluminense",
  "metz",
  "panathinaikos",
  "genk",
  "kaa",
  "fortaleza",
  "anderlecht",
  "antwerp",
  "girona",
  "goianiense",
  "queens",
  "clermont",
  "salernitana",
  "seattle",
  "lanus",
  "bromwich",
  "spezia",
  "demirspor",
  "greuther",
  "lorient",
  "midtjylland",
  "atlanta united",
  "reading",
  "tenerife",
  "coventry",
  "middlesbrough",
  "stoke",
  "leganes",
  "talleres",
  "estoril",
  "parma",
  "fortuna",
  "millwall",
  "vitesse",
  "basel",
  "benevento",
  "huddersfield",
  "swansea",
  "nurnberg",
  "monza",
  "gijon",
  "palmas",
  "cartagena",
  "zaragoza",
  "huesca",
  "philadelphia",
  "karlsruher",
  "paderborn",
  "auxerre",
  "Málaga",
  "birmingham",
  "lecce",
  "heidenheim",
  "cardiff",
  "galaxy",
  "diamonds",
  "hannover",
  "ponferradina",
  "oviedo",
  "toulouse",
  "kashima",
  "cerezo",
  "hull",
  "bulls",
  "jeju",
  "nagoya",
  "gamba",
  "sanfrecce",
  "groningen",
  "samsung",
  "seoul",
  "lugo",
  "plymouth",
  "bolton",
  "kashiwa",
  "munchen1860",
  "charlton",
  "daegu",
  "port-vale",
  "northampton",
  "doncaster",
  "accrington",
]

const questions = [...teams, ...clubs]
// const questions = [
// "seoul",
// "germany",
// "Netherlands",
// "brazil",
// "Belgium",
// "Argentina",
// ]

const host = "http://localhost"

questions.sort((a, b) => {
  return Math.random() > 0.5 ? -1 : 1 // 如果a<b不交换，否则交换，即升序排列；如果a>b不交换，否则交换，即将序排列
})

// console.log(questions)

async function preload(questions: any) {
  let imgs: any[] = []

  for (let i = 0; i < questions.length; i++) {
    const res = await axios(`/data/${questions[i]}/${questions[i]}.json`)
    const notionlogo = res.data.notionLogo
    const playerimgs = res.data.players.map((item: any) => item.img)
    const teamlogos = res.data.players.map((item: any) => item.teamlogo)
    imgs = [notionlogo, ...playerimgs, ...teamlogos, ...imgs]
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

const countValue = 25
const waitSuccess = 8

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
      url: `/data/${matchKey}/${matchKey}.json`,
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
          {/* <button onClick={() => setStep(1)}>显示答案</button> */}
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
                  <span>{data.notionName}</span>
                </div>
                <div className="top"></div>
                <img src={data.notionLogo} />
              </div>
            )}
          </div>
          <div className="field-large">
            <div className={step === 0 ? "lineup" : "lineup2"}>
              {data.players.map((item: any) => {
                return (
                  <div
                    className="field-player "
                    style={{ left: item.left, top: item.top }}
                    key={item.img}
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
