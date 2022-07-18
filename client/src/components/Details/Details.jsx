import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import '../Details/Details.css'


export default function VideogameDetails(props){
    const dispatch = useDispatch();
//    const id = props.match.params.id;



const myVideogame = useSelector((state) => state.detail)
const params = useParams()

useEffect(()=> {
    dispatch(getDetail(params.id))        
},[])
// console.log('detaail disp',useEffect())
// console.log('paraams', params.id)

    // console.log('videogame detaiil', myVideogame)

    // const Detail = myVideogame
    // console.log('detale',Detail)
    const genresAll = myVideogame.genres?.map(g => g.name).join(' | ');
    const genresAll2 = myVideogame.Genres?.map(g => g.name).join(' | ');
//    console.log('geneeeros con g detalles',genresAll)

//    console.log('geneeeros con G detalles',genresAll2)

    return (
      <div className="container"> 
            <div>
                {
                (myVideogame.length === 0)?
                    <div className="container">
                        <p className="loading">Cargando ...</p>
                    </div> 
                    :
                    <div className="box">
                        <h1 className="mainTitle"> {myVideogame.name}</h1>
                        <img className="image" src = {myVideogame.background_image} alt = 'image not found' width= '200px' height= '250px'/>
                        <h3>Generos</h3> 
                        <p>{genresAll === undefined?genresAll2:genresAll}</p>
                        <h3>Descripcion</h3>
                        <p>: {myVideogame.description}</p>
                        <h3>Fecha de lanzamiento</h3>
                        <p>{myVideogame.released}</p>
                        <h3>Rating</h3>
                        <p> {myVideogame.rating}</p>
                        <h3>Plataformas</h3>
                        <p> {myVideogame.platforms}</p>
                    </div>
                }
            </div>
              
        <div className="boxButton">
          <Link to = '/home'>
              <button className="button">Volver a la pagina principal</button>
          </Link>

        </div>
    </div>
    )





      }