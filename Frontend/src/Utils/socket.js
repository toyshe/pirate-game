import {io} from "socket.io-client"

const URL = "https://pirate-game-lb9p.onrender.com/"
const socket = io(URL)

export default socket