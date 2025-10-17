import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import App from "./team/App"
import AppCustom from "./team/AppCustom"
import Player from "./player/App"
import GenerateApp from "./generateplayer/index2"

function RouteApp() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="custom" element={<AppCustom />} />
        <Route path="generate" element={<GenerateApp />} />
        <Route path="player" element={<Player />} />
      </Routes>
    </div>
  )
}

export default RouteApp
