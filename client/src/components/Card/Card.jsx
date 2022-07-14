import React from 'react';
import { Link } from 'react-router-dom';
export default function Card({id, name, genres, background_image}){
return(
    <div>
        <Link to = {`/videogames/${id}`}>
        <h3>{name}</h3>
        </Link>
        <h4>{genres}</h4>
        <img src = {background_image} alt = 'img not found' width='200px' height='250px'/>
    </div>
)
}