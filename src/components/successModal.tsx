import { Modal } from "antd"
import { Mode, getConfigCount } from "../team/App"
import { useEffect, useState } from "react"

export const SuccessModal = ({
  answers,
  mode,
  count,
}: {
  answers: any
  mode: Mode
  count: number
}) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (count === 0) {
      setVisible(true)
      // 3s
      setTimeout(() => {
        setVisible(false)
      }, (getConfigCount(Mode.entertainment, false).waitSuccessCount / 2) * 1000)
    }
  }, [count])

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
      </div>
    </Modal>
  )
}
