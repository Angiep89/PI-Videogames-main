import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function VideogameDetails(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const myVideogame = useSelector((state) => state.detail)
    console.log('videogame detaiil', myVideogame)

    useEffect(()=> {
        dispatch(getDetail(id))
    },[dispatch, id])

    return (
      <div>
          {
              myVideogame.length?
              <div>
                  
                  <h1> {myVideogame[0].name}</h1>
                  <img src = {myVideogame[0].image} alt = 'image not found'/>
                  


              </div>:
              <p>Loading......</p>
              
          }

          <Link to = '/home'>
              <button>Volver a la pagina principal</button>
          </Link>
      </div>
  )




    // return (<div>

    //     {myVideogame.id==id?(<div className={s.gameDetail} style={style}>
    //     <h1 className={s.title}>{game.name}</h1>
    //     <div className={s.content}>
    //       {myVideogame.description_raw ? myVideogame.description_raw : myVideogame.description}
    //     </div>
    //     <div className={s.rAndP}>
    //       <span>
    //         <h3>Genres</h3>
    //         <ul>
    //           {myVideogame.genres?.map((g, i) => {
    //             return <li key={i}>{g.name}</li>;
    //           })}
    //         </ul>
    //       </span>
    //       <span>
    //         <h3>Platforms</h3>
    //         <ul>
    //           {myVideogame.platforms?.map((p, i) => {
    //             let name = p.platform ? p.platform.name : p.name;
    //             return <li key={i}>{name}</li>;
    //           })}
    //         </ul>
    //       </span>
    //       <span>
    //         <h3>Rating</h3>
    //         <div>{myVideogame.rating}</div>
    //         <div>
    //           release date: {myVideogame.released}
    //         </div>
      
    //       </span>
    //     </div>
      
    //     <Link to={"/home"} style={{ textDecoration: "none" }}>
    //       <button className='btn'>Go to Home</button>
    //     </Link>
    //     <div>
    //       {game.name_original?game.name_original:null}
    //     </div>
    //   </div>):<h2>
    //     Loading...
    //   </h2>}
    //   </div>
    //   )
      }