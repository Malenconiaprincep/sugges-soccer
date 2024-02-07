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
import { BiliDanmu, startConnection } from "innoz-bili-util"
// import ReactAudioPlayer from "react-audio-player"
import useDjs from "../hooks/usedjs"
// import Demo from "./demo"
import useImagePreloader from "../hooks/useimagepreloader"
import {
  getCount,
  getDetailTeam,
  getList,
  getPlayers,
  pageSize,
} from "../config/team"
import { host } from "../config/env"
import { national, club } from "../config/source"
import { IFROM, convertMessage } from "../lib/convert"

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

// const whiteList = [
//   {
//     name: "西班牙",
//     type: "national",
//     searchKey: "Spain",
//     alias: ["西班牙", "Spain"],
//   },
//   {
//     name: "德国",
//     type: "national",
//     searchKey: "germany",
//     alias: ["德国", "germany"],
//   },

//   {
//     name: "法国",
//     type: "national",
//     searchKey: "France",
//     alias: ["法国", "France"],
//   },
//   {
//     name: "葡萄牙",
//     type: "national",
//     searchKey: "Portugal",
//     alias: ["葡萄牙", "Portugal"],
//   },
//   {
//     name: "荷兰",
//     type: "national",
//     searchKey: "Netherlands",
//     alias: ["荷兰", "Netherlands"],
//   },
//   {
//     name: "比利时",
//     type: "national",
//     searchKey: "Belgium",
//     alias: ["比利时", "Belgium"],
//   },
//   {
//     name: "英格兰",
//     type: "national",
//     searchKey: "England",
//     alias: ["英格兰", "England"],
//   },
//   {
//     name: "意大利",
//     type: "national",
//     searchKey: "Italy",
//     alias: ["意大利", "Italy"],
//   },
// {
//   name: "拜仁慕尼黑",
//   originName: "FC Bayern München",
//   url: "/team/21/fc-bayern-munchen/",
// },
// {
//   name: "巴黎圣日耳曼",
//   type: "club",
//   searchKey: "paris saint",
//   alias: ["巴黎圣日耳曼", "psg"],
// },
// {
//   name: "曼城",
//   originName: "Manchester City",
//   url: "/team/10/manchester-city/",
// },
// { name: "阿森纳", originName: "Arsenal", url: "/team/1/arsenal/" },
// { name: "利物浦", originName: "Liverpool", url: "/team/9/liverpool/" },
// {
//   name: "曼联",
//   originName: "Manchester United",
//   url: "/team/11/manchester-united/",
// },
// {
//   name: "热刺",
//   originName: "Tottenham Hotspur",
//   url: "/team/18/tottenham-hotspur/",
// },
// {
//   name: "多特蒙德",
//   originName: "Borussia Dortmund",
//   url: "/team/22/borussia-dortmund/",
// },
// {
//   name: "皇家马德里",
//   originName: "Real Madrid",
//   url: "/team/243/real-madrid/",
// },
// {
//   name: "巴塞罗那",
//   originName: "FC Barcelona",
//   url: "/team/241/fc-barcelona/",
// },
// {
//   name: "马德里竞技",
//   originName: "Atlético Madrid",
//   url: "/team/240/atletico-madrid/",
// },
// { name: "埃因霍温", originName: "PSV", url: "/team/247/psv/" },
// { name: "波尔图", originName: "Porto", url: "/team/236/porto/" },
// { name: "国际米兰", originName: "Inter", url: "/team/44/inter/" },
// { name: "ac米兰", originName: "Milan", url: "/team/47/milan/" },
// { name: "尤文图斯", originName: "Juventus", url: "/team/45/juventus/" },
// { name: "那不勒斯", originName: "Napoli", url: "/team/48/napoli/" },
// ].map((item) => item.name)

const whiteList = [...national].map((item) => item.name)

const isZh = window.location.search.indexOf("zh") !== -1
const isDebug = window.location.search.indexOf("debug") !== -1
const isBili = window.location.search.indexOf("bili") !== -1
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

const convertData = (data: any, players: any) => {
  console.log(`当前数据:`)
  console.log(data)
  const type = getValueByKeyPath(data, "type")
  const res = {
    name: isZh
      ? getValueByKeyPath(data, "name")
      : getValueByKeyPath(data, "alias")[1],
    logo: host + getValueByKeyPath(data, "logo.url"),
    players: getValueByKeyPath(data, "formations.formation").map(
      (player: any) => {
        const findPlayer = players.find(
          (item: any) => item.attributes.pid === player.pid
        )
        return {
          ...player,
          teamlogo:
            host +
            getValueByKeyPath(
              getValueByKeyPath(findPlayer, "teams").data.filter(
                (team: any) => {
                  return getValueByKeyPath(team, "type") !== type
                }
              )[0],
              "logo.url"
            ),
          img: host + getValueByKeyPath(findPlayer, "avatar.url"),
          name:
            getValueByKeyPath(findPlayer, "name") +
            " " +
            getValueByKeyPath(findPlayer, "family_name"),
        }
      }
    ),
    search_key: getValueByKeyPath(data, "search_key"),
  }
  return res
}

export const useWindowEvent = (
  event: any,
  callback: any,
  data: any,
  loaded: boolean
) => {
  useEffect(() => {
    if (!isBili && !loaded) {
      window.addEventListener(event, (e) => {
        const message = convertMessage(IFROM.douyin, e.data.data)
        if (message) {
          callback({
            type: "chat",
            data: message,
          })
        }
      })
    }
    return () => {
      window.removeEventListener(event, callback)
    }
  }, [event, callback, data])
}

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
    if (isBili) {
      start()
    }
  }, [data, callback])
}

const countValue = isDebug ? 2 : 15
const waitSuccess = isDebug ? 2 : 8
const delayNetTime = 8

let currentData: any = null

function App() {
  const [loaded, setLoad] = useState(false)
  const [preloadSrcList, setPreloadSrcList] = useState([])
  const { imagesPreloaded, preloadProgress } = useImagePreloader(preloadSrcList)
  const [step, setStep] = useState(0)
  const [bindMessage, setBindMessage] = useState(false)
  const { count, setCount } = useDjs(countValue, imagesPreloaded, loaded)
  const [data, setData] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [answer, setAnswer] = useState<string[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [questions, setQuestions] = useState({})

  useLayoutEffect(() => {
    const fetch = async () => {
      const res: any = await preload(questions)
      setPreloadSrcList(res)
      setLoad(true)
      return res
    }
    setBindMessage(true)
    fetch()
  }, [])

  async function preload(questions: any) {
    let assets: any[] = []

    const count = await getCount()

    const pages = Math.ceil(count / pageSize)

    console.log("一共有", count, "球队  ", "共有", pages, "页")
    // load assets
    for (let i = 1; i <= pages; i++) {
      let list = (await getList(i)) as any

      console.log(
        ">> 原始",
        list.map((item: any) => item.attributes.name)
      )

      list = list.filter((item: any) => {
        return whiteList.includes(item.attributes.name)
      })
      console.log(
        "过滤长度 >> ",
        list.map((item: any) => item.attributes.name)
      )
      if (list) {
        for (let i = 0; i < list.length; i++) {
          const team = list[i]
          const pids = getValueByKeyPath(team, "formations.formation.pid").map(
            (player: any) => player.pid
          )
          const players = await getPlayers(pids)
          assets.push(getValueByKeyPath(team, "logo.url"))
          if (players && players.length > 0) {
            players.forEach((player: any) => {
              assets.push(getValueByKeyPath(player, "avatar.url"))
              const teams = getValueByKeyPath(player, "teams")
              teams.data.forEach((team: any) => {
                assets.push(getValueByKeyPath(team, "logo.url"))
              })
            })
          }

          setQuestions((olddata) => {
            return {
              ...olddata,
              [team.attributes.name]: convertData(team, players),
            }
          })
        }
      }
    }

    console.log(`当前加载的题目： [${Object.keys(questions)}]`)

    return assets
  }

  const receiveMessage = (event: any) => {
    if (step === 1) return
    if (event && event.type === "chat") {
      const item = event.data
      const ans = item.content.toUpperCase()
      if (
        currentData &&
        (ans === currentData.name.replace(/\s/g, "").toUpperCase() ||
          ans === currentData.name.toUpperCase())
      ) {
        // 回答正确
        setAnswer(Array.from(new Set([...answer, item.nickname])))
        // setVisible(true)
        // setCount(0)
        // setTimeout(() => {
        //   // const audio = document.querySelector("audio")
        //   // ;(audio as any).pause()
        //   // ;(audio as any).currentTime = 0
        //   // ;(audio as any).src = ""

        //   setVisible(false)
        //   setAnswer("")
        // }, 6000)
      }
    }
  }

  useWindowEvent("message", receiveMessage, data, bindMessage)
  useBiliDanmu(receiveMessage, data)

  useEffect(() => {
    const fetch = async () => {
      // @ts-ignore
      const question = questions[Object.keys(questions)[startIndex]]
      setAnswer([])
      if (question) {
        setData(question)
        setTimeout(() => {
          currentData = question
        }, delayNetTime * 1000)
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
          setTimeout(() => {
            setCount(countValue)
          }, 300)
        }, 500)
      }, waitSuccess * 1000)
      // ;(audio as any).pause()
    }
  }, [count])

  useEffect(() => {
    if (imagesPreloaded && loaded) {
      console.log("资源加载完成")
    }
  }, [imagesPreloaded, loaded])

  if (!imagesPreloaded || !loaded) {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
          color: "#ffffff",
          justifyContent: "center",
        }}
      >
        <p
          style={{ color: "#ffffff", fontSize: "40px" }}
        >{`游戏加载进度:  ${preloadProgress}`}</p>
      </div>
    )
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
                  <p>
                    球队地址：{" "}
                    {Object.keys(questions).length > 0 && (
                      <a
                        target="_blank"
                        href={`https://sofifa.com/${
                          // @ts-ignore
                          questions[Object.keys(questions)[startIndex]]
                            .search_key
                        }`}
                      >
                        球队地址
                      </a>
                    )}
                  </p>
                  <p>当前第 {startIndex} 个</p>
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
                marginTop: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {step === 0 && count !== 0 && (
                <div className="count-down">{count}</div>
              )}
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
          {answer.length > 0 && count === 0 && (
            <Modal
              visible={true}
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
                  <p className="res">恭喜下面粉丝回答正确</p>
                  <ol className="item">
                    {answer.map((item, index) => {
                      if (index >= 5) return
                      return (
                        <li>
                          <span className="name">
                            {item && item.length > 15
                              ? item.slice(0, 10) + "..."
                              : item}
                          </span>
                        </li>
                      )
                    })}
                  </ol>
                  {answer.length >= 5 && (
                    <div className="item">
                      <span className="name">等{answer.length - 5}名</span>
                    </div>
                  )}
                </p>
              </div>
            </Modal>
          )}
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
