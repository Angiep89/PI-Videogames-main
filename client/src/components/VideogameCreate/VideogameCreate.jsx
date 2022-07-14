import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../../actions";

function validate(input){
    let errors= {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    }else if(input.description){
        errors.description = 'La descripcion debe ser completada'
    } else if (!input.rating || input.rating<0 || input.rating >5) {
        errors.rating = 'El rating debe ser un numero entre 0 y 5';
    }  else if (!input.released) {
        errors.released = 'Fecha de lanzamiento es requerida';
    }else if (!input.description) {
        errors.description = 'Se require de una descripcion';
    }else if(input.genres.length< 1){
        errors.genres= 'Se debe seleccionar al menos un genero'
    }else if(input.platforms.length< 1){
        errors.platforms= 'Se debe seleccionar al menos una plataforma'
    }
    return errors
}

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres) //traerse los generos
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        description: "",
        date: "",
        background_image:"",
        rating: "",
        genres: [],
        platforms: []
    })

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    // function handleDelete(el){
    //     setInput({
    //         ...input,
    //         genres: input.genres.filter(gen => gen !== el)
    //     })
    // }
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    console.log(input)
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
   
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input))
        alert('Videojuego creado con exito')
        setInput({
            name: "",
            description: "",
            date: "",
            background_image:"",
            rating: "",
            genres: [],
            platforms: []
        })
        history.push('/home')
    }
  
    // console.log(input)
    return (
        <div>
            <Link to = '/home'>
                <button>Volver al menu principal</button>
            </Link>
                <h1>Crea tu videojuego</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre</label>
                        <input
                            type= "text"
                            value = {input.name}
                            name = "name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input
                            type= "text"
                            value= {input.description}
                            name = "description"
                            onChange={(e) => handleChange(e)}
                            
                        />
                         {errors.description && (
                            <p className="error">{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label>Fecha de lanzamiento</label>
                        <input
                            type= "date"
                            value= {input.date}
                            name = "date"
                            onChange={(e) => handleChange(e)}

                        />
                          {errors.date && (
                            <p className="error">{errors.date}</p>
                        )}
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
                          {errors.rating && (
                            <p className="error">{errors.rating}</p>
                        )}
                    </div>
                    <div>
                        <label>Imagen</label>
                        <input
                        type= "text"
                        value= {input.background_image}
                        name= "background_image"
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
                         {/* {input.genres.map(el => 
                            <div>
                                <p key={el}>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                            </div>
                        )}  */}
                    <ul>
                        <li>{input.genres.map(p => p + ' | ')}</li>
                    </ul>  
                    {errors.genres && (
                            <p className="error">{errors.genres}</p>
                        )} 
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
                        {errors.platforms && (
                            <p className="error">{errors.platforms}</p>
                        )}
                    </div>
                    <button type = 'submit'>Crear personaje</button>
                </form>
           

        </div>
    )
}