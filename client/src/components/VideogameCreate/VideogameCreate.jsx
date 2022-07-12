import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postVideogame, getGenres } from "../../actions";

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres) //traerse los generos
    const platforms = useSelector((state) => state.platforms)
    const [input, setInput] = useState({
        name: "",
        description: "",
        date: "",
        rating: 0,
        genres: [],
        platforms: []
    })

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleCheck(e){
        if (e.target.checked){ //si el input esta check
            setInput({
                ...input,
                platforms: e.target.value
            })
        }
    }
    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
    
    // console.log(input)
    return (
        <div>
            <Link to = '/home'>
                <button>Volver al menu principal</button>
            </Link>
                <h1>Crea tu videojuego</h1>
                <form>
                    <div>
                        <label>Nombre</label>
                        <input
                            type= "text"
                            value = {input.name}
                            name = "name"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input
                            type= "text"
                            value= {input.description}
                            name = "description"
                            onChange={(e) => handleChange(e)}

                        />

                    </div>
                    <div>
                        <label>Fecha de lanzamiento</label>
                        <input
                            type= "date"
                            value= {input.date}
                            name = "date"
                            onChange={(e) => handleChange(e)}

                        />
                    </div>
                    <div>
                        <label>Rating</label>
                        <input
                            type= "number"
                            value ={input.rating}
                            name = "rating"
                            min= "0"
                            max= "5"
                            onChange={(e) => handleChange(e)}

                        />
                    </div>
                    <div>
                     <label>Generos</label>
                        <select onChange={(e) => handleSelect(e)}>
                            {genres.map((gen) => (
                                <option key = {gen.name} value = {gen.name}>{gen.name}</option>
                        ))}

                        </select>
                    <ul>
                        <li>{input.genres.map(p => p + ' | ')}</li>
                    </ul>  
                    </div>
                    <div>
                        <label>Plataformas</label>

                    </div>
                    <div>
                    <label className="title-name"><strong>Platforms: </strong> </label>
                        <div id='platforms' className="plat-div">
                            <div>
                                <input name='PC' type="checkbox" value="PC" onChange={(e) => handleCheck(e)} />
                                <label htmlFor="PC">PC.</label>
                            </div>
                            <div>
                                <input name='iOS' type="checkbox" value="iOS" onChange={(e) => handleCheck(e)} />
                                <label htmlFor="iOS">iOS.</label>
                            </div>
                            <div>
                                <input name='Android' type="checkbox" value="Android"  onChange={(e) => handleCheck(e)}/>
                                <label htmlFor="Android">Android.</label>
                            </div>
                            <div>
                                <input name='macOS' type="checkbox" value="macOS" onChange={(e) => handleCheck(e)} />
                                <label htmlFor="macOS">macOS.</label>
                            </div>
                            <div>
                                <input name='PlayStation 4' type="checkbox" value="PlayStation 4" onChange={(e) => handleCheck(e)} />
                                <label htmlFor="PlayStation 4">PlayStation 4.</label>
                            </div>
                            <div>
                                <input name='PlayStation 5' type="checkbox" value="PlayStation 5"  onChange={(e) => handleCheck(e)}/>
                                <label htmlFor="PlayStation 5">PlayStation 5.</label>
                            </div>
                            <div>
                                <input name='XBOX' type="checkbox" value="XBOX" onChange={(e) => handleCheck(e)} />
                                <label htmlFor="XBOX">XBOX.</label>
                            </div>
                            <div>
                                <input name='PS Vita' type="checkbox" value="PS Vita" onChange={(e) => handleCheck(e)}/>
                                <label htmlFor="PS Vita">PS Vita.</label>
                            </div>
                        </div>
                    </div>
                    <button type = 'submit'>Crear personaje</button>
                </form>
           

        </div>
    )
}