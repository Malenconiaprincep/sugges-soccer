import { Modal } from "antd"
import { useEffect, useState } from "react"
import { Mode, getConfigCount } from "../team/App"

export const BattleRule = () => {
  return (
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
        <div>赛局模式规则</div>
        <div className="congra">
          <ul>
            <li>一局赛共有10题随机选出,每道题计时10s。</li>
            <li>每道题答对得1分，答错不得分。</li>
            <li>每题显示前10排名及对应分数。</li>
            <li>赛局结束后自动切换为娱乐模式。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const CompetitionRule = () => {
  return (
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
        <div>竞赛模式规则!</div>
        <div className="congra">
          <ul>
            <li>每道题计时10s，时间到后显示答案。</li>
            <li>最终显示前5排名和若干人。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const EntertainmentRule = () => {
  return (
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
        <div>娱乐模式规则</div>
        <div className="congra">
          <ul>
            <li>每道题计时15s，时间到后显示答案。</li>
            <li>不显示答题者排名。</li>
            <li>竞赛模式或赛局模式不出现默认娱乐模式。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const ModalRuleComponent = ({
  mode,
  count,
}: {
  mode: Mode
  count: number
}) => {
  let childComponent = null
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (count === 0) {
      setVisible(true)
      // 3s
      setTimeout(() => {
        setVisible(false)
      }, getConfigCount(mode, false).modeChangeCount * 1000)
    }
  }, [count])

  if (mode === Mode.entertainment) {
    childComponent = <EntertainmentRule />
  } else if (mode === Mode.competition) {
    childComponent = <CompetitionRule />
  } else if (mode === Mode.battle) {
    childComponent = <BattleRule />
  }

  return (
    <Modal visible={visible} footer={null} closable={false} centered={true}>
      {childComponent}
    </Modal>
  )
}
