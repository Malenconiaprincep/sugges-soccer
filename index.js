// // 引入所需的模块
const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const path = require("path")

// 创建 Express 应用程序
const app = express()

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "build")))

// 创建 HTTP 服务器
const server = http.createServer(app)

// 创建 WebSocket 服务器，并将其附加到 HTTP 服务器
const wss = new WebSocket.Server({ server })

// 存储 clientId 和对应的 WebSocket 连接的映射关系
let webClient = false

// WebSocket 连接建立时的处理程序
wss.on("connection", function connection(ws) {
  // 生成唯一的 clientId

  // 将 clientId 和 WebSocket 连接存储到映射关系中
  webClient = ws

  // 收到消息时的处理程序
  ws.on("message", function incoming(message) {
    try {
      const parseMessage = JSON.parse(message)
      if (parseMessage.type === "chat") {
        // 回复收到的消息
        webClient.send(`${message}`)
      }
      if (parseMessage.type === "gift") {
        console.log("接收到消息: %s", message)
        webClient.send(`${message}`)
      }
    } catch (e) {
      console.warn(e)
      // console.log("接收到消息: %s", message)
      // // 回复收到的消息
      // webClient.send(`收到消息: ${message}`)
    }
  })

  setInterval(() => {
    webClient.send("ping")
  }, 60000)

  // setInterval(() => {
  //   webClient.send(
  //     '{"id":7335727571088250000,"type":"gift","nickname":"喵手回春","content":"英格兰","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"棒棒糖","count":0,"url":"","desc":""}}'
  //   )
  // }, 15000)

  // setInterval(() => {
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"喵手回春","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"小心心","count":0,"url":"","desc":""}}`
  //   )
  // }, 3000)

  // setInterval(() => {
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"makuta","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"小心心","count":0,"url":"","desc":""}}`
  //   )
  // }, 3000)
  // let i = 0
  // setInterval(() => {
  //   if (i % 3 === 0) {
  //     webClient.send(
  //       `{"id":7335727571088250000,"type":"gift","nickname":"makuta2","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"棒棒糖"}","count":0,"url":"","desc":""}}`
  //     )
  //   } else if (i % 3 === 1) {
  //     // webClient.send(
  //     //   `{"id":7335727571088250000,"type":"gift","nickname":"makuta2","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //     // )
  //   } else {
  //     // webClient.send(
  //     //   `{"id":7335727571088250000,"type":"chat","nickname":"makuta2","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //     // )
  //   }
  //   i++
  // }, 3000)

  // setInterval(() => {
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"makuta1","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"makuta33","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )

  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )

  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test2","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test3","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test4","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test5","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test6","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test7","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test8","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test9","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test10","content":"德国","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  //   webClient.send(
  //     `{"id":7335727571088250000,"type":"chat","nickname":"test11","content":"西班牙","memberCount":0,"likeCount":0,"followCount":0,"totalUserCount":0,"rank":[],"gift":{"name":"${"小心心"}","count":0,"url":"","desc":""}}`
  //   )
  // }, 3000)

  // 连接关闭时的处理程序
  ws.on("close", function close() {
    console.log("WebSocket 连接已关闭。")
  })
})

// 设置 Express 路由
app.get("/", function (req, res) {
  res.send("这是 Express 应用程序！")
})

// 启动服务器
const PORT = process.env.PORT || 8080
server.listen(PORT, function () {
  console.log(`服务器已启动，监听端口 ${PORT}`)
})

// 生成唯一的 clientId
function generateClientId() {
  return Math.random().toString(36).substr(2, 9)
}
