import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GENRES_FILTER = 'GENRES_FILTER';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const RATING_SORT = 'RATING_SORT';
export const FILTER_CREATED = 'FILTER_CREATED';
export const GET_GENRES = 'GET_GENRES';

//AQUI SE CONECTA EL FROM CON EL BACK
export function getVideogames(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
        
    }
}

export function filterVideogamesByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function ratingSort(payload){
    return {
        type: RATING_SORT,
        payload
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function getGenres(){
    return async function (dispatch){
        try{
            var genres = await axios.get ('http://localhost:3001/genres')
            return dispatch({
                type: GET_GENRES,
                payload: genres.data
            })
        }catch(error){
            console.log(error)
        }
    }
}