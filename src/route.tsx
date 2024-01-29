import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import App from "./team/App"
import Player from "./player/App"
import GenerateApp from "./generateplayer/index2"
import Record from "./record"

function RouteApp() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="generate" element={<GenerateApp />} />
        <Route path="player" element={<Player />} />
        <Route path="record" element={<Record />} />
      </Routes>
    </div>
  )
}

export default RouteApp
