import { useState } from "react"

export const Debug = ({
  isDebug,
  isController,
  questions,
  startIndex,
  setStartIndex,
  startTimer,
  pauseTimer,
  step,
  setCount,
}: {
  isDebug: any
  isController?: boolean
  questions: any
  startIndex: number
  setStartIndex: any
  startTimer?: any
  pauseTimer?: any
  step?: number
  setCount?: any
}) => {
  // 暂停按钮开关状态
  const [pause, setPause] = useState(false)

  return (
    (isDebug || isController) && (
      <div className="debug">
        <div
          style={{
            position: "absolute",
            background: !isController ? "white" : "",
            width: "300px",
            height: "30vh",
            right: "50%",
            zIndex: 999,
          }}
        >
          <div>
            {!isController && (
              <div>
                <p>
                  球队地址：{" "}
                  {Object.keys(questions).length > 0 && (
                    <a
                      target="_blank"
                      href={`https://sofifa.com/${
                        // @ts-ignore
                        questions[Object.keys(questions)[startIndex]].search_key
                      }`}
                    >
                      球队地址
                    </a>
                  )}
                </p>
                <p>
                  自定义球队地址：{" "}
                  {Object.keys(questions).length > 0 && (
                    <a
                      target="_blank"
                      href={`https://sofifa.com/squad/${
                        // @ts-ignore
                        questions[Object.keys(questions)[startIndex]].search_key
                      }`}
                    >
                      球队地址
                    </a>
                  )}
                </p>
                <p>当前第 {startIndex} 个</p>
                {/* 输入框按回车后更新里面的数据 */}
                <input
                  type="text"
                  onChange={(e) => {
                    setStartIndex(Number(e.target.value))
                  }}
                />
              </div>
            )}
            <button
              onClick={() => {
                if (step !== 0) {
                  return
                }
                setStartIndex((startIndex: number) => startIndex - 1)
                setCount(15)
              }}
            >
              上一个
            </button>
            <button
              onClick={() => {
                if (step !== 0) {
                  return
                }
                if (startIndex + 1 === Object.keys(questions).length) {
                  setStartIndex(0)
                } else {
                  setStartIndex((startIndex: number) => startIndex + 1)
                }
                setCount(15)
              }}
            >
              下一个
            </button>
            <button
              onClick={() => {
                if (step !== 0) {
                  return
                }
                if (!pause) {
                  startTimer()
                  setPause(true)
                } else {
                  pauseTimer()
                  setPause(false)
                }
              }}
            >
              {!pause ? "开始播放" : "暂停"}
            </button>
          </div>
        </div>
      </div>
    )
  )
}
