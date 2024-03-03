import axios from 'axios';



export function getAvatar(){
    return axios.get("https://pirate-game-lb9p.onrender.com/avatars").then((response) => {
        return response.data
    })
}

export function getPictionaryPrompts(){
    return axios.get("https://pirate-game-lb9p.onrender.com/pictionaryPrompts").then((response) => {
        return response.data
    })
}