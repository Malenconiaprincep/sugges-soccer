import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"
import ReactAudioPlayer from "react-audio-player"
import axios from "axios"

const host = "http://192.168.2.100"

const newReg =
  /[`~!@#$%^&*()+=|{}':;',/\/\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]|[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g

const Demo = (props: any) => {
  const answer = props.answer
  const [src, setSrc] = useState("")
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (play && src) {
      const audio = document.querySelector("audio")
      try {
        ;(audio as any).play()
      } catch (e) {}
      setPlay(false)
    }
  }, [src, play])

  useEffect(() => {
    if (!answer) return
    // console.log(answer)

    axios({
      method: "get",
      url: `${host}:7777/?name=${answer.replace(newReg, "")}`,
      responseType: "stream",
    }).then(function (response) {
      // 回答正确
      // 播放
      setSrc(host + ":8888/" + response.data.url + "?t=" + Math.random())
      setPlay(true)
    })
  }, [answer])

  // console.log(answer)
  // console.log(src)

  return (
    <div>
      <ReactAudioPlayer
        src={src}
        autoPlay
        controls
        style={{ position: "absolute", left: "-10000px" }}
      />
    </div>
  )
}

export default forwardRef(Demo)
