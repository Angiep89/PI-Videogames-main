import { FILTER_BY_GENRE, GET_VIDEOGAMES, ORDER_BY_NAME, RATING_SORT, FILTER_CREATED, GET_GENRES, GET_DETAIL, GET_NAME_VIDEOGAME, POST_VIDEOGAME} from "../actions";
const initialState = {
    videogames : [],
    genres: [],
    copyVideogames: [],
    detail: []
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                copyVideogames: action.payload,
                detail: [],
            }
            
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case FILTER_BY_GENRE:
            const allVideogames = state.videogames
            const genresFiltered = action.payload === ''? allVideogames: allVideogames.filter(videogame => videogame.genres.includes(action.payload))
            if (!genresFiltered.length ){
                alert('No hay videojuegos de ese genero')
                return state
            }else{
                return {
                    ...state,
                    videogames: genresFiltered
                }
                
            }
        case ORDER_BY_NAME:
            const sortedArr = action.payload === 'asc' ?
            state.videogames.sort(function(a, b){
                if(a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }):
            state.videogames.sort(function(a,b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                videogames: sortedArr,
            }
        case RATING_SORT:
            const sortedRating = action.payload === 'nivel min' ?
                state.videogames.sort(function(a,b){
                    if (a.rating > b.rating){
                        return 1;
                    }
                    if(b.rating > a.rating){
                        return -1;
                    }
                    return 0;
                }):
                state.videogames.sort(function(a,b){
                    if(a.rating > b.rating){
                        return -1;
                    }
                    if (b.rating > a.rating){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    videogames: sortedRating
                }
            case FILTER_CREATED:
                const filtered = action.payload === 'Created' ? 
                state.copyVideogames.filter((game)=> (typeof game.id) === 'string'):
                state.copyVideogames.filter((game)=> (typeof game.id) === 'number')
                
                    // const createdFilter = action.payload === 'Created'?
                    // state.copyVideogames.filter(el => el.createdInDb):
                    // state.copyVideogames.filter(el => !el.createdInDb)
                    return {
                        ...state,
                        videogames: action.payload === 'All' ? state.copyVideogames: filtered
                    }
            case GET_DETAIL:
                    return{
                         ...state,
                         detail: action.payload
                    }
           
            case GET_NAME_VIDEOGAME:
                return {
                    ...state,
                    videogames: action.payload
                }
            case POST_VIDEOGAME:
                return {
                    ...state
                }
            default:
                return state;
    }



}
export default rootReducer;