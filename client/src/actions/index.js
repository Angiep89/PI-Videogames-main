import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';


//AQUI SE CONECTA EL FROM CON EL BACK
export function getVideogames(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/videogame');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
        
    }
}