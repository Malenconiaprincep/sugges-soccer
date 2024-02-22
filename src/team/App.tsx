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

const whiteList = [...national, ...club].map((item) => item.name)
const isZh = window.location.search.indexOf("zh") !== -1
const isDebug = window.location.search.indexOf("debug") !== -1
const isLocal = window.location.search.indexOf("local") !== -1
const isBili = window.location.search.indexOf("bili") !== -1
let Constmode = getMode()
export let Gifts: string[] = []

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
            img:
              typeof getValueByKeyPath(findPlayer, "avatar.url") === "string"
                ? host + getValueByKeyPath(findPlayer, "avatar.url")
                : "",
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

            if (message.nickname === "派西维尔") {
              callback({
                type: "gift",
                data: {
                  gift: { name: message.content, count: 0, url: "", desc: "" },
                  nickname: `主播`,
                },
              })
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
      async function preload(questions: any) {
        let assets: any[] = []
        const count = isLocal ? 2 : await getCount()
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
      if (event.type === "gift") {
        Gifts.push(item.nickname)
        // console.log("收到礼物", item.gift.name)
        if (item.gift.name.indexOf(list[0].subtitle) !== -1) {
          if (Mode.entertainment !== mode) {
            nextMode = Mode.entertainment
          }
        }
        if (recordBattleModeStart === 0) {
          if (item.gift.name.indexOf(list[1].subtitle) !== -1) {
            if (recordBattleModeStart === 0) {
              recordBattleModeStart = 1
              nextMode = Mode.competition
            }
            if (Mode.competition !== mode) {
              nextMode = Mode.competition
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
        if (nextMode === Mode.battle || nextMode === Mode.competition) {
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
              if (recordBattleModeStart !== 0) {
                if (resetMode !== nextMode) {
                  recordBattleModeStart = 1
                }
              }
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
          {(mode === Mode.battle || mode === Mode.competition) && (
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
                      key={`${item.pid}`}
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

          <div style={{ color: "white" }}>
            <p style={{ color: "white", fontSize: "20px" }}>
              球队数据截止 2024.2.20 (未成年禁止打赏)
            </p>
            <p style={{ color: "white" }}>
              <span>版本 1.0.1 </span>
            </p>
          </div>
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
