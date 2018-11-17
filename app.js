const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const Server = require('socket.io')
const http = require('http')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const robot = require("robotjs")


const exec = require('child_process').exec
const cmdStr = 'key.vbs'

// 静态文件路径
const staticPath = './view'

app.use(static(
  path.join( __dirname,  staticPath)
))

// app.use(router.routes())

const server = http.createServer(app.callback()).listen(3000)
const io = new Server(server)

io.on('connection', function (socket) {
    console.log('new connect')

    socket.on('keydown', function (data) {
      console.log(data, 'down')
      robot.keyToggle(data, 'down')
    })
    socket.on('keyup', function (data) {
      console.log(data, 'up')
      robot.keyToggle(data, 'up')
    })
})
