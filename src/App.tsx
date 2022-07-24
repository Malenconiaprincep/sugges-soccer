import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

function App() {
  const id = window.location.search.match(/\?id=(.+)/)
  const matchId = id && id[1]
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(5)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8888/${matchId}.json`,
      responseType: "stream",
    }).then(function (response) {
      setData(response.data)
    })
  }, [matchId])

  useEffect(() => {
    let interval: any = null
    if (data && count) {
      interval = setInterval(() => {
        setCount(count - 1)
      }, 1000)
    } else {
      if (count === 0) {
        setStep(1)
      }
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [count, data])

  return (
    data && (
      <div className="App">
        <div className="block-two-third">
          {/* <button onClick={() => setStep(1)}>显示答案</button> */}
          <div style={{ height: "120px" }}>
            {step === 0 && <div className="count-down"></div>}
            {step === 1 && (
              <div className="answer">
                <img src={data.notionLogo} />
                <span>{data.notionName}</span>
              </div>
            )}
          </div>

          <div className="field-large">
            <div className="lineup">
              {data.players.map((item: any) => {
                return (
                  <div
                    className="field-player "
                    style={{ left: item.left, top: item.top }}
                  >
                    {step === 1 && (
                      <>
                        <div>
                          <img
                            className="field-avatar animated zoomIn"
                            src={item.img}
                          />
                        </div>
                        <div className="field-name animated zoomIn">
                          <img src={item.teamlogo} className="field-logo" />
                          {item.name}
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
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default App
