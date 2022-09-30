import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import App from "./team/App"
import Player from "./player/App"
import GenerateApp from "./generateplayer/index2"

function RouteApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="generate" element={<GenerateApp />} />
        <Route path="player" element={<Player />} />
      </Routes>
    </div>
  )
}

export default RouteApp
