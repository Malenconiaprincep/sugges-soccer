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
        right: "0",
        // width: "100%",
        zIndex: "99",
        opacity: 0.8,
        textAlign: "left",
      }}
    >
      <p>
        赛局题目{" "}
        {`${
          recordBattleModeStart < 0 ? 0 : recordBattleModeStart
        }/${recordBattleModeEnd}`}
      </p>
    </div>
  )
}
