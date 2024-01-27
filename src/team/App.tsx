import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { Modal } from "antd"
import "antd/dist/antd.css"
import "./App.css"
import axios from "axios"
// import ReactAudioPlayer from "react-audio-player"
import useDjs from "../hooks/usedjs"
// import Demo from "./demo"
import useImagePreloader from "../hooks/useimagepreloader"
import { getCount, getDetailTeam, getList, pageSize } from "../config/team"
import { host } from "../config/env"
import { national } from "../config/source"

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
  // "lille",
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
  "deportivo",
  "hertha",
  "cadiz",
  "granada",
  "etienne",
  "nantes",
]

const whiteList = national.map((item) => item.name)

const isDebug = window.location.search.indexOf("debug") !== -1
// const questions = [...teams, ...clubs]

// const host = "http://localhost"

function getValueByKeyPath(data: any, keypath: string) {
  const keys = keypath.split(".")
  let result = data
  keys.forEach((key) => {
    try {
      if (result.data) {
        if (Array.isArray(result.data)) {
          result = result.data[0].attributes[key]
        } else {
          result = result.data.attributes[key]
        }
      }
      if (result.attributes) {
        result = result.attributes[key]
      }
    } catch (e) {}
  })
  return result
}

// questions.sort((a, b) => {
//   return Math.random() > 0.5 ? -1 : 1 // 如果a<b不交换，否则交换，即升序排列；如果a>b不交换，否则交换，即将序排列
// })

// questions.splice(questions.indexOf(["manchester united"]), 1)
// questions.splice(questions.indexOf(["real madrid"]), 1)
// questions.splice(30, 0, "manchester united")
// questions.splice(60, 0, "real madrid")

// console.log(questions)

const convertData = (data: any) => {
  console.log(`当前数据:`)
  console.log(data)
  const type = getValueByKeyPath(data, "type")
  const res = {
    name: getValueByKeyPath(data, "name"),
    logo: host + getValueByKeyPath(data, "logo.url"),
    players: getValueByKeyPath(data, "formations.formation").map(
      (item: any) => {
        const player = getValueByKeyPath(data, "players").data.filter(
          (p: any) => p.attributes.pid === item.pid
        )[0]
        return {
          ...item,
          teamlogo:
            host +
            getValueByKeyPath(
              getValueByKeyPath(player, "teams").data.filter((team: any) => {
                return getValueByKeyPath(team, "type") !== type
              })[0],
              "logo.url"
            ),
          img: host + getValueByKeyPath(player, "avatar.url"),
          name:
            getValueByKeyPath(player, "name") +
            " " +
            getValueByKeyPath(player, "family_name"),
        }
      }
    ),
  }
  return res
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

const countValue = isDebug ? 2 : 15
const waitSuccess = isDebug ? 2 : 8

function App() {
  const [loaded, setLoad] = useState(false)
  const [preloadSrcList, setPreloadSrcList] = useState([])
  const { imagesPreloaded } = useImagePreloader(preloadSrcList)
  const [step, setStep] = useState(0)
  const { count, setCount } = useDjs(countValue)
  const [data, setData] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [answer, setAnswer] = useState<string>("")
  const [startIndex, setStartIndex] = useState(0)
  const [questions, setQuestions] = useState({})

  useLayoutEffect(() => {
    const fetch = async () => {
      const res: any = await preload(questions)
      setPreloadSrcList(res)
      setLoad(true)
      return res
    }

    fetch()
  }, [])

  async function preload(questions: any) {
    let assets: any[] = []

    const count = await getCount()
    const pages = Math.ceil(count / pageSize)

    // load assets
    for (let i = 1; i <= pages; i++) {
      let list = (await getList(i)) as any
      list = list.filter((item: any) => {
        return whiteList.includes(item.attributes.name)
      })
      if (list) {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          assets.push(item.attributes.logo.data.attributes.url)

          setQuestions((olddata) => {
            return {
              ...olddata,
              [item.attributes.name]: item,
            }
          })
        }
      }
    }

    console.log(`当前加载的题目： [${Object.keys(questions)}]`)

    return assets
  }

  const receiveMessage = useCallback(
    (event: any) => {
      if (step === 1) return
      const item = event.data?.data
      if (item && item.type === "chat") {
        const ans = item.content.toUpperCase()
        if (
          ans === data.name.replace(/\s/g, "").toUpperCase() ||
          ans === data.name.toUpperCase()
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
        }
      }
    },
    [data, visible, step]
  )

  useGlobalMessage(receiveMessage)

  useEffect(() => {
    const fetch = async () => {
      // @ts-ignore
      const id = questions[Object.keys(questions)[startIndex]].id
      const res: any = await getDetailTeam(id)
      if (res) {
        const convertRes = convertData(res)
        setData(convertRes)
      }
    }

    if (loaded) {
      fetch()
    }
  }, [startIndex, loaded])

  useEffect(() => {
    if (isDebug) {
      setStep(1)
      return
    }
    if (count === 0) {
      // 出答案
      setStep(1)
      setTimeout(() => {
        // 等一段时间下一题
        setStep(2)
        if (startIndex === Object.keys(questions).length) {
          setStartIndex(1)
        } else {
          if (startIndex + 1 === Object.keys(questions).length) {
            setStartIndex(0)
          } else {
            setStartIndex((startIndex) => startIndex + 1)
          }
        }

        setTimeout(() => {
          setStep(0)
          setCount(countValue)
        }, 600)
      }, waitSuccess * 1000)
      // ;(audio as any).pause()
    }
  }, [count])

  useEffect(() => {
    if (imagesPreloaded && loaded) {
      console.log("资源加载完成")
    }
  }, [imagesPreloaded, loaded])

  if (!imagesPreloaded && !loaded) {
    return <p>Preloading Assets</p>
  }

  return (
    data && (
      <div>
        {isDebug && (
          <div className="debug">
            {isDebug && (
              <div
                style={{
                  position: "absolute",
                  background: "white;",
                  width: "300px",
                  height: "50vh",
                }}
              >
                <div>
                  <button
                    onClick={() => {
                      setStartIndex((startIndex) => startIndex - 1)
                    }}
                  >
                    上一个
                  </button>
                  <button
                    onClick={() => {
                      if (startIndex + 1 === Object.keys(questions).length) {
                        setStartIndex(0)
                      } else {
                        setStartIndex((startIndex) => startIndex + 1)
                      }
                    }}
                  >
                    下一个
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="App">
          <div className="bg"></div>
          <div className="block-two-third">
            {/* <button onClick={() => setStep(1)}>显示答案</button> */}
            <div
              style={{
                height: "80px",
                marginBottom: "40px",
                marginTop: "100px",
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
                    <span>{data.name}</span>
                  </div>
                  <div className="top"></div>
                  <img src={data.logo} />
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
                      key={`${item.img}`}
                    >
                      {step === 1 && (
                        <>
                          <div>
                            <img
                              className="field-avatar animated zoomIn"
                              src={`${item.img}`}
                            />
                          </div>
                          <div className="field-name animated zoomIn">
                            <img src={item.teamlogo} className="field-logo" />
                            {item.name.length > 12
                              ? item.name.substring(0, 10) + "..."
                              : item.name}
                            {isDebug ? item.pid : ""}
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
                      {step === 0 && (
                        <>
                          <div style={{ display: "none" }}>
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
          <Modal
            visible={visible}
            footer={null}
            closable={false}
            centered={true}
          >
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
      </div>
    )
  )
}

export default App
