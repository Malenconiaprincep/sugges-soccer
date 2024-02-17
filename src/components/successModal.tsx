import { Modal } from "antd"
import { Mode, getConfigCount, recordBattleModeEnd } from "../team/App"
import { useEffect, useState } from "react"

function sortObjectByArrayLength(
  obj: { [s: string]: unknown } | ArrayLike<unknown>
) {
  // 将对象转换为键值对数组，并根据数组长度排序
  const sortedArray = Object.entries(obj).sort(
    (a: [string, unknown], b: [string, unknown]) =>
      (b[1] as string[]).length - (a[1] as string[]).length
  )

  return sortedArray
}

export const SuccessModal = ({
  answers,
  answersMap,
  mode,
  count,
  index,
}: {
  answers: any
  answersMap?: any
  mode: Mode
  count: number
  index?: number
}) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (count === 0) {
      setVisible(true)
      // 3s
      setTimeout(() => {
        setVisible(false)
      }, (getConfigCount(mode, false).waitSuccessCount / 2) * 1000)
    }
  }, [count])

  // 根据对象数组的长度排序
  // 数据为

  return (
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
        <div className="congra">
          {mode === Mode.battle ? (
            <div>
              <p>
                {recordBattleModeEnd === index ? (
                  <span className="red">最终排名</span>
                ) : (
                  <span className="gray">
                    {`赛局排名（${index}/${recordBattleModeEnd}）`}
                  </span>
                )}
              </p>
              <ol className="item">
                {sortObjectByArrayLength(answersMap).map(
                  (item: any, index: number) => {
                    if (index >= 10) return
                    return (
                      item && (
                        <li key={index}>
                          <span className="name">
                            {item && item[0].length > 15
                              ? item[0].slice(0, 10) + "..."
                              : item[0]}
                          </span>
                          <span
                            className="orange"
                            style={{ paddingLeft: "5px" }}
                          >
                            ({item[1].length}分)
                          </span>
                        </li>
                      )
                    )
                  }
                )}
              </ol>
            </div>
          ) : (
            <div>
              <p className="res">恭喜下面粉丝回答正确</p>
              <ol className="item">
                {answers.map((item: string, index: number) => {
                  if (index >= 5) return
                  return (
                    <li key={index}>
                      <span className="name">
                        {item && item.length > 15
                          ? item.slice(0, 10) + "..."
                          : item}
                      </span>
                    </li>
                  )
                })}
              </ol>
              {answers.length > 5 && (
                <div className="item">
                  <span className="name">等{answers.length - 5}名</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
