import React from "react";
import {Link} from 'react-router-dom';
import { getGenres, getVideogames } from "../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import '../LandingPage/LandingPage.css'
import image from '../images/1147178.jpg'

export default function LandingPage(){
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

    return(
        <div className = 'landing'>
            <div>
                <h1>Bienvenidos</h1>
                <h1>Videogames APP</h1>
            <Link to = 'home'>
                <button className="button">Ingresar</button>
            </Link>
           

            </div>
            

        </div>
    )
}

