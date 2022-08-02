import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"
import ReactAudioPlayer from "react-audio-player"
import axios from "axios"

const Demo = (props: any) => {
  const answer = props.answer
  const [src, setSrc] = useState("")
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (play && src) {
      setSrc(src)
      setPlay(false)
    }
  }, [src, play])

  useEffect(() => {
    if (!answer) return
    const random = Math.random()
    console.log(random)
    axios({
      method: "get",
      url: `http://localhost:7777/?name=${answer}${random}`,
      responseType: "stream",
    }).then(function (response) {
      // 回答正确
      // 播放
      setSrc("http://localhost:8888/" + response.data.url)
      setPlay(true)
    })
  }, [answer])

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
