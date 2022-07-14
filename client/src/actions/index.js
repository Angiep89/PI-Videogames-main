import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GENRES_FILTER = 'GENRES_FILTER';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const RATING_SORT = 'RATING_SORT';
export const FILTER_CREATED = 'FILTER_CREATED';
export const GET_GENRES = 'GET_GENRES';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_NAME_VIDEOGAME = 'GET_NAME_VIDEOGAME';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';

//AQUI SE CONECTA EL FROM CON EL BACK

export  function  getVideogames() {
    return async function (dispatch){
       await axios.get('http://localhost:3001/videogames')
        .then((r) => {
            return dispatch({ 
                type: GET_VIDEOGAMES, 
                payload: r.data 
            });
        })
        .catch((error) => {
            console.log(error);
        });
    };
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


export  function  getGenres() {
    return async function (dispatch){
       await axios.get('http://localhost:3001/genres')
        .then((r) => {
            return dispatch({ 
                type: GET_GENRES, 
                payload: r.data 
            });
        })
        .catch((error) => {
            console.log(error);
        });
    };
}



export function getDetail(id) {
    return async function(dispatch) {
         await axios.get('http://localhost:3001/videogame/' +id) 
         .then((r) => {
             return dispatch({
                    type: GET_DETAIL,
                    payload: r.data,
                 })
         })
         .catch((error) => {
            console.log(error);
         });
    };
};



export function getNameVideogame(name){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_NAME_VIDEOGAME,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postVideogame(payload){
    return async function (dispatch){
        try{
            const response = await axios.post('http://localhost:3001/videogames', payload); //Hace el post del payload
            console.log(response)
            return response

        }catch(error){
            console.log(error)
        }
    }
}