import React from 'react';
import { Link } from 'react-router-dom';
import '../Card/Card.css'

export default function Card({id, name, genres, background_image}){
return(
    <div className='mainContainer'>
        <Link to = {`/videogame/${id}`}>
        <h3 className='title'>{name}</h3>
        </Link>
        <h4 className='genres'>{genres}</h4>
        <img className= 'imagen'src = {background_image} alt = 'img not found' width='200px' height='250px'/>
    </div>
)
}