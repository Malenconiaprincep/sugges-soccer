import { useEffect, useState } from "react"
import { host } from "../config/env"

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = img.onabort = function () {
      reject(src)
    }
    img.src = src
  })
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false)
  const [preloadProgress, setPreloadProgress] = useState<number>(0)

  useEffect(() => {
    let isCancelled = false

    async function effect() {
      console.log("PRELOAD IMAGES")

      if (isCancelled || imageList.length === 0) {
        return
      }

      const imagesPromiseList: Promise<any>[] = []
      let index = 0
      for (const i of imageList) {
        imagesPromiseList.push(
          preloadImage(`${host}${i}`).then(() => {
            const progress = Math.round((index++ / imageList.length) * 100)
            setPreloadProgress(progress)
          })
        )
      }
      await Promise.all(imagesPromiseList)

      if (isCancelled) {
        return
      }

      setImagesPreloaded(true)
    }

    effect()

    return () => {
      isCancelled = true
    }
  }, [imageList])

  return { imagesPreloaded, preloadProgress }
}
