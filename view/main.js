const socket = io('http://192.168.31.241:3000/')


function handleClickKey (key) {
    socket.emit('key', key)
}