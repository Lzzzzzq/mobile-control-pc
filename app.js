const Koa = require('koa')
const Router = require('koa-router')
const Server = require('socket.io')
const http = require('http')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const robot = require('robotjs')
const qr = require('qr-image')
const os = require('os')
const portfinder = require('portfinder')
const qrcode = require('qrcode-terminal')
const colors = require('colors')
const ifaces = os.networkInterfaces()

const app = new Koa()
const router = new Router()

let ip = ''
let port = 3000

// 静态文件路径
const staticPath = './view/dist'

// 获取内网ip地址
Object.keys(ifaces).forEach(function(dev) {
  ifaces[dev].forEach(function(details) {
    if (details.family === 'IPv4') {
      ip = details.address
    }
  })
})

// 获取可使用的端口号
portfinder.basePort = port
portfinder.getPort(function(err, port) {
  if (err) {
    throw err
  }

  let url = `http://${ip}:${port}/#/main`
  // let url = `http://${ip}:8080/#/main`

  // 获取页面二维码
  router.get('/qrcode', ctx => {
    let img = qr.image(url, { size: 10 })
    ctx.status = 200
    ctx.set('Content-Type', 'image/png')
    img.pipe(ctx.res)
  })

  app.use(router.routes())

  app.use(static(path.join(__dirname, staticPath)))

  const server = http.createServer(app.callback()).listen(port)

  console.log('Please sweep the qrcode: ')
  qrcode.generate(url, function(
    qrcode
  ) {
    console.log(qrcode)
    console.log(
      'Or visit ' + 
      colors.bgBlack.green(`http://${ip}:${port}/qrcode`)
       + ' to get it in the browser'
    )
  })
  const io = new Server(server)

  let aList = {}
  let pList = {}

  io.on('connection', function(socket) {
    let { id } = socket
    if (!pList[id]) {
      console.log(`User ${id} connect the controller`.green)
      pList[id] = socket
    }
    socket.emit('welcome')

    socket.on('keydown', function(data) {
      robot.keyToggle(data, 'down')
    })
    socket.on('keyup', function(data) {
      robot.keyToggle(data, 'up')
    })

    socket.on('touchstart', function () {
      const pos = robot.getMousePos()

      socket.on('changeMousePos', ({x, y}) => {
        robot.moveMouse(pos.x + x * 1.5, pos.y + y * 1.5)
      })
    })
    socket.on('touchend', function () {
      socket.removeAllListeners('changeMousePos')
    })
    socket.on('mouseclick', function () {
      robot.mouseClick()
    })

    socket.on('disconnect', function() {
      console.log(`User ${id} disconnect the controller`.yellow)
      delete pList[id]
    })
  })
})

