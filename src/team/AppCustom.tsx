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
import { ModalRuleComponent } from "../components/modalRule"
import { Debug } from "../components/debug"
import { list } from "../components/gift"

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
  // 游戏时间
  let timerCount
  // 出答案后等待时间
  let waitSuccessCount
  // 答案弹窗显示时间
  let modalAnswerCount = 3
  // 模式切换等待时间，中间可能有说明
  let modeChangeCount = 8
  if (isDebug) {
    timerCount = 2
    waitSuccessCount = 2
  } else if (isLocal) {
    if (Mode.entertainment === mode) {
      timerCount = 5
    } else {
      timerCount = 3
    }

    waitSuccessCount = 10
    if (Mode.battle === mode) {
      modeChangeCount = 4
      waitSuccessCount = 10
    }
  } else {
    if (Mode.entertainment === mode) {
      timerCount = 15
    } else {
      timerCount = 10
    }
    if (Mode.battle === mode) {
      modeChangeCount = 8
    }
    waitSuccessCount = 10
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

console.log(whiteList, ">>whitelist")

const convertData = (data: any, players: any) => {
  try {
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
  } catch (e) {
    console.log(data)
  }
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

let nextMode: Mode = Mode.entertainment
// 对战回合数
let recordBattleModeStart = 0
export const recordBattleModeEnd = isLocal ? 3 : 10

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
  const [modalRule, setModalRule] = useState(false)
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
      const questions = {
        德国2002: {
          name: "德国2002",
          logo: "https://soccer.innoz.art/uploads/cb9f8a8199b79b5ad8eb36bd7d0ed841_05814160b9.png",
          players: [
            {
              pid: "10684",
              top: "-2%",
              left: "23.66%",
              name: "Oliver Neuville",
              teamlogo:
                "https://soccer.innoz.art/uploads/thumbnail_68d8ba67834ba710d63000bdbe352660_52b8eb19dc.png",
              img: "/player/1.png",
            },
            {
              pid: "11141",
              top: "-2%",
              left: "55.34%",
              name: "Miroslav Klose",
              teamlogo: "https://cdn.sofifa.net/meta/team/1638/60.png",
              img: "https://soccer.innoz.art/uploads/679697a5ccee4e67316118da94783517_a8d98e0f91.png",
            },
            {
              pid: "559",
              top: "35%",
              left: "2.54%",
              name: "Jörg Böhme",
              teamlogo:
                "https://soccer.innoz.art/uploads/thumbnail_feb39149b254665b05b63a8e338062a4_66c332e806.png",
              img: "/player/3.png",
            },
            {
              pid: "3647",
              top: "40%",
              left: "26.3%",
              name: "Michael Ballack",
              teamlogo:
                "https://soccer.innoz.art/uploads/thumbnail_f8b5f2c8bd6119dc04bc8e5983cfe4b4_4d858b964b.png",
              img: "https://soccer.innoz.art/uploads/b1fd355dd0bbdaa12132e7f9467f7655_30c365e710.png",
            },
            {
              pid: "5430",
              top: "40%",
              left: "52.7%",
              name: "Torsten Frings",
              teamlogo:
                "https://soccer.innoz.art/uploads/thumbnail_3c2d0509ae8f2d99d14d874bd17c31a6_7cb028a781.png",
              img: "https://soccer.innoz.art/uploads/a94cc44be7c18aa6ede9d6ace0b77370_83a6977c16.png",
            },
            {
              pid: "3922",
              top: "35%",
              left: "76.46%",
              name: "Bernd Schneider",
              teamlogo:
                "https://soccer.innoz.art/uploads/thumbnail_f8b5f2c8bd6119dc04bc8e5983cfe4b4_4d858b964b.png",
              img: "/player/2.png",
            },
            {
              pid: "3894",
              top: "65%",
              left: "4.3%",
              name: "Carsten Ramelow",
              teamlogo:
                "https://soccer.innoz.art/uploads/thumbnail_f8b5f2c8bd6119dc04bc8e5983cfe4b4_4d858b964b.png",
              img: "https://soccer.innoz.art/uploads/dcf5171f2f41e289a8ab042dff457306_100c2823b4.png",
            },
            {
              pid: "808",
              top: "70%",
              left: "27.18%",
              name: "Thomas Linke",
              teamlogo: "https://soccer.innoz.artundefined",
              img: "https://soccer.innoz.art/uploads/7e306ac006ca455cd61ba66535510872_a1e765e417.png",
            },
            {
              pid: "30663",
              top: "70%",
              left: "51.82%",
              name: "Christoph Metzelder",
              teamlogo: "https://soccer.innoz.artundefined",
              img: "https://soccer.innoz.art/uploads/837d716747c3dc31107eb95bc56d658d_8548bd7f64.png",
            },
            {
              pid: "1000",
              top: "65%",
              left: "74.7%",
              name: "Marko Rehmer",
              teamlogo: "https://soccer.innoz.artundefined",
              img: "https://soccer.innoz.art/uploads/799f9c408f13b0c98fedfac92877887b_47bb8cf03f.png",
            },
            {
              pid: "488",
              top: "85%",
              left: "39.5%",
              name: "Oliver Kahn",
              teamlogo: "https://soccer.innoz.artundefined",
              img: "https://soccer.innoz.art/uploads/e06927a22e162ae2b3d5277350a3abe3_065c2b2ca3.png",
            },
          ],
          search_key: "1094443",
        },
        巴西2002: {
          name: "巴西2002",
          logo: "https://soccer.innoz.art/uploads/cb9f8a8199b79b5ad8eb36bd7d0ed841_05814160b9.png",
          players: [
            {
              left: "23.66%",
              top: "-2%",
              pid: "37576",
              name: "Ronaldo",
              teamlogo: "",
              img: "",
            },
            {
              left: "54.46%",
              top: "-2%",
              pid: "4231",
              name: "Rivaldo",
              teamlogo: "",
              img: "",
            },
            {
              left: "39.5%",
              top: "15%",
              pid: "28130",
              name: "Ronaldinho",
              teamlogo: "",
              img: "",
            },
            {
              left: "2.54%",
              top: "35%",
              pid: "1040",
              name: "Roberto Carlos",
              teamlogo: "",
              img: "",
            },
            {
              left: "26.3%",
              top: "42%",
              pid: "23409",
              name: "Kléberson",
              teamlogo: "",
              img: "",
            },
            {
              left: "52.7%",
              top: "42%",
              pid: "47390",
              name: "Gilberto Silva",
              teamlogo: "",
              img: "",
            },
            {
              left: "76.46%",
              top: "35%",
              pid: "5003",
              name: "Cafu",
              teamlogo: "",
              img: "",
            },
            {
              left: "17.5%",
              top: "70%",
              pid: "11019",
              name: "Roque Júnior",
              teamlogo: "",
              img: "",
            },
            {
              left: "39.5%",
              top: "70%",
              pid: "40702",
              name: "Edmilson",
              teamlogo: "",
              img: "",
            },
            {
              left: "61.5%",
              top: "70%",
              pid: "107715",
              name: "Lúcio",
              teamlogo: "",
              img: "",
            },
            {
              left: "39.5%",
              top: "85%",
              pid: "137790",
              name: "Marcos",
              teamlogo: "",
              img: "",
            },
          ],
          search_key: "1094443",
        },
      }

      setQuestions(questions)

      // async function preload(questions: any) {
      //   let assets: any[] = []
      //   const count = await getCount()
      //   const pages = Math.ceil(count / pageSize)
      //   console.log("一共有", count, "球队  ", "共有", pages, "页")
      //   // load assets
      //   for (let i = 1; i <= pages; i++) {
      //     let list = (await getList(i)) as any

      //     console.log(
      //       ">> 原始",
      //       list.map((item: any) => item.attributes.name)
      //     )

      //     list = list.filter((item: any) => {
      //       return whiteList.includes(item.attributes.name)
      //     })
      //     console.log(
      //       "过滤长度 >> ",
      //       list.map((item: any) => item.attributes.name)
      //     )
      //     if (list) {
      //       for (let i = 0; i < list.length; i++) {
      //         const team = list[i]
      //         const pids = getValueByKeyPath(
      //           team,
      //           "formations.formation.pid"
      //         ).map((player: any) => player.pid)
      //         const players = await getPlayers(pids)
      //         assets.push(getValueByKeyPath(team, "logo.url"))
      //         if (players && players.length > 0) {
      //           players.forEach((player: any) => {
      //             assets.push(getValueByKeyPath(player, "avatar.url"))
      //             const teams = getValueByKeyPath(player, "teams")
      //             teams.data.forEach((team: any) => {
      //               assets.push(getValueByKeyPath(team, "logo.url"))
      //             })
      //           })
      //         }

      //         setQuestions((olddata: any) => {
      //           return {
      //             ...olddata,
      //             [team.attributes.name]: convertData(team, players),
      //           }
      //         })
      //       }
      //     }
      //   }
      //   return assets
      // }
      // const res: any = await preload(questions)
      // setPreloadSrcList(res)
      // return res
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
        if (recordBattleModeStart === 0) {
          if (item.gift.name.indexOf(list[0].subtitle) !== -1) {
            if (Mode.entertainment !== mode) {
              nextMode = Mode.entertainment
            }
          }
          if (item.gift.name.indexOf(list[1].subtitle) !== -1) {
            if (Mode.competition !== mode) {
              nextMode = Mode.competition
            }
          }
        }
        if (item.gift.name.indexOf(list[2].subtitle) !== -1) {
          if (Mode.battle !== mode) {
            nextMode = Mode.battle
          }
          if (recordBattleModeStart === 0) {
            recordBattleModeStart = 1
          }
        }
      }
    }
  }

  const answersRef = useDouyin(socket, receiveMessage, data)
  // console.log(`当前回答对的人: `, answersRef.current)
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
    if (mode !== Mode.battle || recordBattleModeStart === 1) {
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
      }, getConfigCount(mode, isDebug).waitSuccessCount * 1000)
    }
  }, [count])

  useEffect(() => {
    const nextStart = (currentMode: Mode) => {
      if (startIndex === Object.keys(questions).length) {
        setStartIndex(1)
      } else {
        if (startIndex + 1 === Object.keys(questions).length) {
          setStartIndex(0)
        } else {
          setStartIndex((startIndex) => startIndex + 1)
        }
      }

      restart(currentMode)
    }

    const restart = (currentMode: Mode) => {
      setStep(0)
      setTimeout(() => {
        setCount(getConfigCount(currentMode, isDebug).timerCount)
      }, 300)
    }

    // 等待时间
    if (step === 2) {
      if (nextMode !== mode) {
        setMode(nextMode)
        setModalRule(true)
        message.info(`当前切换模式为：${modeMap[nextMode]}`)
        setTimeout(() => {
          setModalRule(false)
          nextStart(nextMode)
        }, getConfigCount(nextMode, isDebug).modeChangeCount * 1000) // Adjust the delay time as needed
      } else {
        if (nextMode === Mode.battle) {
          if (recordBattleModeStart === recordBattleModeEnd) {
            const resetMode = Mode.entertainment
            setMode(resetMode)
            setModalRule(true)
            recordBattleModeStart = 0
            nextMode = resetMode
            message.info(`当前切换模式为：${modeMap[resetMode]}`)
            setTimeout(() => {
              setModalRule(false)
              nextStart(resetMode)
            }, getConfigCount(resetMode, isDebug).modeChangeCount * 1000) // Adjust the delay time as needed
          } else {
            recordBattleModeStart++
            nextStart(mode)
          }
        } else {
          nextStart(mode)
        }
      }
    }
  }, [step])

  useEffect(() => {
    setLoad(true)
  }, [])

  if (!loaded) {
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
        <Debug
          isDebug={isDebug}
          questions={questions}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
        />

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

          {mode !== Mode.entertainment &&
            newAnswer.length > 0 &&
            count === 0 &&
            step === 1 && (
              <SuccessModal
                answers={newAnswer}
                answersMap={answersRef.current}
                mode={mode}
                count={count}
                index={recordBattleModeStart}
              />
            )}

          {modalRule && count === 0 && (
            <ModalRuleComponent mode={mode} count={count} />
          )}

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
