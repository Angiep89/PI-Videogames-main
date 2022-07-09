import React from 'react';

export default function Card({name, genres, background_image}){
return(
    <div>
        <h3>{name}</h3>
        <h3>{genres}</h3>
        <img src = {background_image} alt = 'img not found' width='200px' height='250px'/>
    </div>
)
}