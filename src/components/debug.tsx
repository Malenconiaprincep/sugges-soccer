export const Debug = ({
  isDebug,
  questions,
  startIndex,
  setStartIndex,
}: {
  isDebug: any
  questions: any
  startIndex: number
  setStartIndex: any
}) => {
  return (
    isDebug && (
      <div className="debug">
        {isDebug && (
          <div
            style={{
              position: "absolute",
              background: "white",
              width: "300px",
              height: "30vh",
              right: 0,
              zIndex: 999,
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
              <button
                onClick={() => {
                  setStartIndex((startIndex: number) => startIndex - 1)
                }}
              >
                上一个
              </button>
              <button
                onClick={() => {
                  if (startIndex + 1 === Object.keys(questions).length) {
                    setStartIndex(0)
                  } else {
                    setStartIndex((startIndex: number) => startIndex + 1)
                  }
                }}
              >
                下一个
              </button>
            </div>
          </div>
        )}
      </div>
    )
  )
}
