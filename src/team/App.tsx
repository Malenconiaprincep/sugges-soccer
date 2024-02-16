import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { Modal, message } from "antd"
import "antd/dist/antd.css"
import "./App.css"
import axios from "axios"
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
import useSocket from "../hooks/usesocket"
import { ModeComponent } from "../components/mode"
import { modeMap } from "../config/mode"
import { TipComponent } from "../components/tip"
import { getValueByKeyPath } from "../lib/strapi-util"
import { SuccessModal } from "../components/successModal"
import { RandomQuestions } from "../utils/random"

export enum Mode {
  // 娱乐
  entertainment = "entertainment",
  // 竞速
  competition = "competition",
  // 对战
  battle = "battle",
}

export function getMode() {
  const mode = new URLSearchParams(window.location.search).get("mode")
  switch (mode) {
    case "competition":
      return Mode.competition
    case "battle":
      return Mode.battle
    default:
      return Mode.entertainment
  }
}

export function getConfigCount(
  mode: Mode = Mode.entertainment,
  isDebug: boolean = false
) {
  let timerCount
  let waitSuccessCount
  let modalAnswerCount = 3
  let modeChangeCount = 1
  if (isDebug) {
    timerCount = 2
    waitSuccessCount = 2
  } else if (isLocal) {
    if (Mode.entertainment === mode) {
      timerCount = 5
    } else {
      timerCount = 3
    }
    waitSuccessCount = 4
  } else {
    if (Mode.entertainment === mode) {
      timerCount = 15
    } else {
      timerCount = 10
    }
    waitSuccessCount = 8
  }

  return {
    timerCount,
    waitSuccessCount,
    modalAnswerCount,
    modeChangeCount,
  }
}

const whiteList = [...national].map((item) => item.name)
const isZh = window.location.search.indexOf("zh") !== -1
const isDebug = window.location.search.indexOf("debug") !== -1
const isLocal = window.location.search.indexOf("local") !== -1
const isBili = window.location.search.indexOf("bili") !== -1
let Constmode = getMode()

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

export const useDouyin = (
  socket: any,
  callback: any,
  res: any // 答案
) => {
  const answersRef = useRef<any>({})

  useEffect(() => {
    if (socket) {
      const messageHandler = (event: any) => {
        const message = convertMessage(IFROM.douyin, event.data)
        if (message) {
          if (message.type === "chat") {
            const ans = message.content.toUpperCase()
            if (
              res &&
              (ans === res.name.replace(/\s/g, "").toUpperCase() ||
                ans === res.name.toUpperCase())
            ) {
              // 回答正确
              if (answersRef.current[message.nickname]) {
                if (
                  answersRef.current[message.nickname].indexOf(res.name) === -1
                ) {
                  answersRef.current[message.nickname].push(res.name)
                }
              } else {
                answersRef.current[message.nickname] = [res.name]
              }
            }
          } else {
            callback({
              type: message.type,
              data: message,
            })
          }
        }
      }
      socket.addEventListener("message", messageHandler)
      return () => {
        socket.removeEventListener("message", messageHandler)
      }
    }
  }, [socket, res?.name])

  return answersRef
}

let lastMode: Mode = Mode.entertainment
let nextMode: Mode = Mode.entertainment
// 对战回合数
let recordBattleModeStart = -1
export const recordBattleModeEnd = 3

function App() {
  const [loaded, setLoad] = useState(false)
  const [preloadSrcList, setPreloadSrcList] = useState([])
  const { imagesPreloaded, preloadProgress } = useImagePreloader(preloadSrcList)
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState(Constmode)
  const { count, setCount } = useDjs(
    getConfigCount(mode, isDebug).timerCount,
    imagesPreloaded,
    loaded
  )
  const [data, setData] = useState<any>(null)
  const [startIndex, setStartIndex] = useState(0)
  const [questions, setQuestions] = useState<any>({})
  const [reloadSocket, setReloadSocket] = useState(false)
  const socketRef = useRef<any>(null)
  const socket = useSocket(
    "ws://localhost:8080",
    reloadSocket,
    setReloadSocket,
    socketRef
  )

  // 预加载数据
  useLayoutEffect(() => {
    const fetch = async () => {
      async function preload(questions: any) {
        let assets: any[] = []
        const count = await getCount()
        const pages = Math.ceil(count / pageSize)
        console.log("一共有", count, "球队  ", "共有", pages, "页")
        // load assets
        for (let i = 1; i <= pages; i++) {
          let list = (await getList(i)) as any

          // console.log(
          //   ">> 原始",
          //   list.map((item: any) => item.attributes.name)
          // )

          list = list.filter((item: any) => {
            return whiteList.includes(item.attributes.name)
          })
          // console.log(
          //   "过滤长度 >> ",
          //   list.map((item: any) => item.attributes.name)
          // )
          if (list) {
            for (let i = 0; i < list.length; i++) {
              const team = list[i]
              const pids = getValueByKeyPath(
                team,
                "formations.formation.pid"
              ).map((player: any) => player.pid)
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

              setQuestions((olddata: any) => {
                return {
                  ...olddata,
                  [team.attributes.name]: convertData(team, players),
                }
              })
            }
          }
        }
        return assets
      }
      const res: any = await preload(questions)
      setPreloadSrcList(res)
      return res
    }
    fetch()
  }, [])

  const receiveMessage = (event: any) => {
    if (event) {
      const item = event.data
      // if (event.type === "chat" && count !== 0) {
      //   const ans = item.content.toUpperCase()
      //   if (
      //     data &&
      //     (ans === data.name.replace(/\s/g, "").toUpperCase() ||
      //       ans === data.name.toUpperCase())
      //   ) {
      //     // 回答正确
      //     if (answer[item.nickname]) {
      //       answer[item.nickname]++
      //     } else {
      //       answer[item.nickname] = 1
      //     }
      //   }
      // }
      if (event.type === "gift") {
        // console.log("收到礼物", item.gift.name)
        if (recordBattleModeStart === -1) {
          if (item.gift.name.indexOf("小心心") !== -1) {
            if (Mode.entertainment !== mode) {
              nextMode = Mode.entertainment
            }
            recordBattleModeStart = -1
          }
          if (item.gift.name.indexOf("抖音") !== -1) {
            if (Mode.competition !== mode) {
              nextMode = Mode.competition
            }
            recordBattleModeStart = -1
          }
        }
        if (item.gift.name.indexOf("棒棒糖") !== -1) {
          if (Mode.battle !== mode) {
            setMode(Mode.battle)
          }
          if (recordBattleModeStart === -1) {
            recordBattleModeStart = 0
          }
        }
      }
    }
  }

  const answersRef = useDouyin(socket, receiveMessage, data)
  console.log(`当前回答对的人: `, answersRef.current)
  // useBiliDanmu(receiveMessage, data)

  // 开始的题
  useEffect(() => {
    const fetch = async () => {
      const arrQuestions = Object.keys(questions)
      console.log("当前所有题目：", arrQuestions)
      const question = questions[arrQuestions[startIndex]]
      if (question) {
        setData(question)
      }
    }

    if (loaded) {
      fetch()
    }
    // 清空答对者
    if (mode !== Mode.battle) {
      answersRef.current = {}
    }
  }, [startIndex, loaded, questions])

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
        // 下一道题目
        // const nextStart = () => {
        //   if (startIndex === Object.keys(questions).length) {
        //     setStartIndex(1)
        //   } else {
        //     if (startIndex + 1 === Object.keys(questions).length) {
        //       setStartIndex(0)
        //     } else {
        //       setStartIndex((startIndex) => startIndex + 1)
        //     }
        //   }

        //   setTimeout(() => {
        //     // 开始出题
        //     setStep(0)
        //     setTimeout(() => {
        //       setCount(getConfigCount(mode, isDebug).timerCount)
        //     }, 300)
        //   }, 500)
        // }

        // // 切换模式tip
        // if (nextMode !== mode) {
        //   setTimeout(() => {
        //     setMode(Mode.competition)
        //     // 切换模式需要暂定
        //     setTimeout(
        //       () => {
        //         recordBattleModeStart++
        //         nextStart()
        //       },
        //       mode === Mode.battle ? 8 * 1000 : 3 * 1000
        //     )
        //   }, 3 * 1000)

        //   // if (mode === Mode.battle) {
        //   //   recordBattleModeStart++
        //   // }
        // } else {
        //   // if (mode === Mode.battle) {
        //   //   if (recordBattleModeStart === recordBattleModeEnd) {
        //   //     setMode(Mode.entertainment)
        //   //     recordBattleModeStart = -1
        //   //     lastMode = Mode.entertainment
        //   //     message.info(`当前切换模式为：${modeMap[Mode.entertainment]}`)
        //   //   } else {
        //   //     recordBattleModeStart++
        //   //     // nextStart()
        //   //   }
        //   // } else {
        //   nextStart()
        //   // }
        // }
      }, getConfigCount(mode, isDebug).waitSuccessCount * 1000)
    }
  }, [count])

  useEffect(() => {
    const nextStart = () => {
      if (startIndex === Object.keys(questions).length) {
        setStartIndex(1)
      } else {
        if (startIndex + 1 === Object.keys(questions).length) {
          setStartIndex(0)
        } else {
          setStartIndex((startIndex) => startIndex + 1)
        }
      }
      restart()
    }

    const restart = () => {
      setStep(0)
      setTimeout(() => {
        setCount(getConfigCount(mode, isDebug).timerCount)
      }, 300)
    }

    // 等待时间
    if (step === 2) {
      if (nextMode !== mode) {
        setMode(nextMode)
        message.info(`当前切换模式为：${modeMap[nextMode]}`)
      }
      setTimeout(() => {
        nextStart()
      }, getConfigCount(mode, isDebug).modeChangeCount * 1000) // Adjust the delay time as needed
    }
  }, [step, nextMode, mode, questions, startIndex, isDebug])

  useEffect(() => {
    if (imagesPreloaded) {
      console.log("资源加载完成, 洗牌")
      const randomQuestions = RandomQuestions(questions, isDebug)
      console.log("洗牌后的题目：", randomQuestions)
      setQuestions(randomQuestions)
      setLoad(true)
    }
  }, [imagesPreloaded])

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

  let newAnswer = Array.from(new Set([...Object.keys(answersRef.current)]))

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
                  right: 0,
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

        <div
          className="App"
          onClick={() => {
            setReloadSocket(true)
          }}
        >
          <ModeComponent mode={mode} />
          {mode === Mode.battle && (
            <TipComponent
              mode={mode}
              recordBattleModeStart={recordBattleModeStart}
            />
          )}

          <div className="bg"></div>
          <div className="block-two-third">
            {/* <button onClick={() => setStep(1)}>显示答案</button> */}
            <div
              style={{
                height: "80px",
                marginBottom: "40px",
                marginTop: "120px",
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
          {newAnswer.length > 0 &&
            count === 0 &&
            step === 1 &&
            (mode !== Mode.battle ||
              (mode === Mode.battle &&
                recordBattleModeStart === recordBattleModeEnd + 1)) && (
              <SuccessModal answers={newAnswer} mode={mode} count={count} />
            )}

          {mode === Mode.battle &&
            count === 0 &&
            recordBattleModeStart === 0 && (
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
                  <div>赛局规则!</div>
                  <div className="congra">
                    <ul>
                      <li>一局赛共有10题随机选出,每道题计时10s。</li>
                      <li>每道题答对得1分，答错不得分。</li>
                      <li>
                        最终显示最终完整的前10排名及对应分数，切换为娱乐模式
                      </li>
                    </ul>
                  </div>
                </div>
              </Modal>
            )}

          <span style={{ color: "white" }}>球队数据截止 2024.2.1</span>
          {/* <button onClick={() => setMode(Mode.competition)}>
            切换模式竞赛
          </button>
          <button onClick={() => setMode(Mode.entertainment)}>
            切换娱乐竞赛
          </button> */}
          {/* <Demo answer={answer} /> */}
          {/* <button
            onClick={() => {
              receiveMessage({
                data: {
                  content: "首尔 fc",
                  type: "chat",
                  nickname: "1111",
                },
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
