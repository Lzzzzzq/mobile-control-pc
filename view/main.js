const socket = io('http://192.168.31.203:3000/')


function handleClickKey (key) {
    socket.emit('key', key)
}

let btns = document.getElementsByClassName('btn')

for (let i = 0 ; i < btns.length ; i ++) {
    let key = btns[i].getAttribute('data-key')
    btns[i].addEventListener('touchstart', function (e) {
        socket.emit('keydown', key)
    })
    btns[i].addEventListener('touchend', function (e) {
        socket.emit('keyup', key)
    })
}
