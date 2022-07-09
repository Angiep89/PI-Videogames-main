import React from "react";

export default function Paginado ({PostPage, paginado, allVideogames }){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allVideogames/PostPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul>
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>

    )
}