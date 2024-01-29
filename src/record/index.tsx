import React, { useState, useRef, useEffect, createRef } from "react"
import "react-html5-camera-photo/build/css/index.css"
import RecordRTC from "recordrtc"
import "./style.css"

const App = () => {
  const [startDisabled, setStartDisabled] = useState(false)
  const [startRecording, setRecordDisabled] = useState(false)
  const [stream, setStream] = useState<any>(null)
  const [recorder, setRecorder] = useState<any>(null)
  const videoRef = useRef(null)

  const handlePreview = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        setStream(stream)
      })
      .catch((error) => {
        console.error("Error accessing camera:", error)
      })
  }

  const handleRecording = () => {
    const recorder = new RecordRTC(stream, {
      type: "video",
      canvas: {
        width: 640,
        height: 480,
      },
    })
    recorder.startRecording()
    setRecorder(recorder)
  }

  const handlestopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "recorded-screen.webm"
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(url)
      })
    }
  }

  useEffect(() => {
    if (stream) {
      // @ts-ignore
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <div>
      <div style={{ position: "absolute", right: "0" }}>
        <button onClick={handlePreview} disabled={startDisabled}>
          开始预览
        </button>
        <button onClick={handleRecording}>开始录制</button>
        <button onClick={handlestopRecording}>结束录制并下载</button>
        <br />
      </div>
      <video
        ref={videoRef}
        autoPlay={true}
        playsInline={true}
        muted={true}
      ></video>
    </div>
  )
}

export default App
