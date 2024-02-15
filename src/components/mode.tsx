import { Mode } from "../team/App"
import { GiftComponent } from "./gift"

export const ModeComponent = ({ mode }: { mode: Mode }) => {
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        alignItems: "leftCenter",
        background: "gray",
        padding: "10px 10px",
        position: "absolute",
        top: "140px",
        left: "30px",
        // width: "100%",
        zIndex: "9999",
        opacity: 0.8,
        textAlign: "left",
      }}
    >
      <div>
        <div>
          当前模式： {Mode.competition === mode ? "竞赛模式" : "娱乐模式"}
        </div>
        <GiftComponent />
      </div>
    </div>
  )
}
