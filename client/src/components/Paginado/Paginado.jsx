import React from "react";
import '../Paginado/Paginado.css'
export default function Paginado ({PostPage, paginado, allVideogames }){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allVideogames/PostPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="barra">
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number} >
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>

    )
}