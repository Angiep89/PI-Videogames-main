import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function VideogameDetails(props){
    const dispatch = useDispatch();
   const id = props.match.params.id;
   console.log('id', id)



   const myVideogame = useSelector((state) => state.detail)


   useEffect(()=> {
       dispatch(getDetail(id))        
    },[dispatch])
    // console.log('detaail disp',useEffect())
    
    console.log('videogame detaiil', myVideogame)

    const Detail = myVideogame
    console.log('detale',Detail)
    return (
      <div>
          
              <div>
                  
                  <h1> {myVideogame.name}</h1>
                  <img src = {myVideogame.background_image} alt = 'image not found' width= '200px' height= '250px'/>
                  {/* <h3>{myVideogame.genres?myVideogame.genres.map(g => g.name).join(' | '):myVideogame[0].Genres.map(g => g.name).join(' | ')}</h3> */}
                  <h3>Descripcion: {myVideogame.description}</h3>
                  <h3>Fecha de lanzamiento: {myVideogame.released}</h3>
                  <h3>Rating: {myVideogame.rating}</h3>
                  <h3>Plataformas: {myVideogame.platforms}</h3>


              </div>
              
          

          <Link to = '/home'>
              <button>Volver a la pagina principal</button>
          </Link>
      </div>
  )





      }