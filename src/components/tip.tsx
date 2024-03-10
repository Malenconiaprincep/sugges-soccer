import { Mode, recordBattleModeEnd } from "../team/App"

export const TipComponent = ({
  mode,
  recordBattleModeStart,
}: {
  mode: Mode
  recordBattleModeStart: number
}) => {
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
        right: "40px",
        // width: "100%",
        zIndex: "99",
        opacity: 0.8,
        textAlign: "left",
      }}
    >
      <div style={{ color: "white" }}>
        <p className="white">
          <p className="white">当前题目</p>
          <p className="white">
          ({" "}{`${
            recordBattleModeStart < 0 ? 0 : recordBattleModeStart
          } / ${recordBattleModeEnd}`}{" "})
          </p>
          
        </p>
      </div>
    </div>
  )
}
