import { Modal } from "antd"
import { useEffect, useState } from "react"
import { currentGift, Mode, getConfigCount } from "../team/App"

export const ModalGiftComponent = ({
  username,
  count,
}: {
  username: string
  count: number
}) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (count === 0 && username) {
      setVisible(true)
      // 3s
      setTimeout(() => {
        setVisible(false)
        currentGift.username = ""
      }, getConfigCount(Mode.entertainment, false).modeChangeCount * 1000)
    }
  }, [count])

  return (
    <Modal visible={visible} footer={null} closable={false} centered={true}>
      <div>
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
          <div style={{ fontSize: "18px" }}>
            感谢来自（
            <span className="orange">{username}</span>
            ）的<span className="orange">{currentGift.giftname}！</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
