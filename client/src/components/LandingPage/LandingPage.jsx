import React from "react";
import {Link} from 'react-router-dom';
import { getVideogames } from "../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function LandingPage(){
//     const dispatch = useDispatch();
//     useEffect(() => {
//     dispatch(getVideogames());
//   }, [dispatch]);
    return(
        <div>
            <h1>Bienvenidos</h1>
            <Link to = 'home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}

