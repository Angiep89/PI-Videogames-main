import React from 'react'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, filterVideogamesByGenre, orderByName, ratingSort, filterCreated, getGenres } from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import '../Home/Home.css'
export default function Home(){
const dispatch = useDispatch();
const allVideogames = useSelector((state) => state.videogames)
const allGenres = useSelector((state) => state.genres)

const [order, setOrder] = useState('')
const [score, setScore] = useState('')

const [page, setPage] = useState(1);
const [PostPage, setPostPage] = useState(15) //Cantidad de items a mostrar
const indexOfLastVideogame = page * PostPage; //se multiplica la pag por items
const indexOfFirstVideogame = indexOfLastVideogame - PostPage; //Tiene que dar 0
const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) //Retira los items y devuelve los primeros 15

const paginado = (pageNumber) => {
    setPage(pageNumber)
}

useEffect(() => {
    dispatch(getVideogames())
}, [])

useEffect(() => {
    dispatch(getGenres())
}, [])
function handleClick(e){
    e.preventDefault();
    dispatch(getVideogames());

}
function handleGenreFilter(e){
    e.preventDefault();
    dispatch(filterVideogamesByGenre(e.target.value))
}

function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
}

function handleScore(e){
    e.preventDefault();
    dispatch(ratingSort(e.target.value))
    setScore(e.target.value)
}

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))

}

return (
    <div className='background'>
        <div className='firstContainer'>
            
            <Link to = '/videogames'><button className='button'>Crear videojuego</button></Link>
            <br/>
            <button onClick={e => {handleClick(e)}}>
            Volver a cargar todos los videojuegos
            </button>
        </div>
        <div className='secondContainer'>   
            <select onChange={(e) => handleSort(e)}>
                <option value ='asc'>Ascendente</option>
                <option value = 'desc'>Descendente</option>
            </select>
            <select onChange={e => handleGenreFilter(e)}>
              <option value='all'>Seleccionar el genero</option>
              {allGenres?.map(genre => {
                return(
                    <option value = {genre.name} key = {genre.name}>{genre.name}</option>
                )
              })}
            </select>
            <select onChange={(e) => handleScore(e)}>
                             <option>Rating</option>
                             <option value = 'nivel min'>0-5</option>
                             <option value = 'nivel max'>5-0</option>
                        </select>
            <select onChange={(e) => handleFilterCreated(e)}>
                <option value = 'All'>Todos</option>
                <option value = 'Created'>Base de datos</option>
                <option value = 'API'>API</option>
            </select>
            <SearchBar/>
        </div>
        <div className='paginado'>
            <Paginado
                PostPage = {PostPage}
                 allVideogames = {allVideogames.length}
                paginado = {paginado}
            />
        </div>
        <div className='eachVideogame'>
            {
                 currentVideogames.map (el => {
                    return (
                        <div >
                                <Card 
                                 key={el.id}
                                 id = {el.id}
                                 name = {el.name}
                                 genres = {el.genres}
                                 background_image = {el.background_image}
                                />
                        </div>
                    )
                })
            }
        </div>
      
    </div>

   


)

}