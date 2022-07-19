import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../../actions";
import './VideogameCreate.css'

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres) //traerse los generos
    const history = useHistory()
    const [errors, setErrors] = useState({
        name: 'Se requiere un nombre',
        description: 'Se requiere una description'
    })
    
    function validate(input){
        let errors= {};
        if(!input.name){
            errors.name = 'Se requiere un nombre';
        }else if(!input.rating){
            errors.rating = 'Se requiere un rating'
        } else if ( input.rating<0 || input.rating >5) {
            errors.rating = 'El rating debe ser un numero entre 0 y 5';
        }  else if (!input.released) {
            errors.released = 'Fecha de lanzamiento es requerida';
        }else if (255<input.description){
            errors.description = 'La descripcion debe ser menor a 255 caracteres'
        }else if (!input.description) {
            errors.description = 'Se requiere de una descripcion';
        }else if(input.genres.length < 1){
            errors.genres= 'Se debe seleccionar al menos un genero'
        }else if(input.platforms.length< 1){
            errors.platforms= 'Se debe seleccionar al menos una plataforma'
        }else if(!input.background_image){
            errors.background_image= 'Se requiere una imagen'
        }else if(!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(input.background_image)){
            errors.background_image = 'Formato de imagen invalido'
        }
        return errors
    }
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        background_image:"",
        rating: "",
        platforms: "",
        genres: []
    })
    console.log('input',input)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

  
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
    function handleCheckPlatforms(e){
        if (e.target.checked){ //si el input esta check
            setInput({
                ...input,
                platforms: input.platforms.concat(' | ', e.target.value),
            })
            setErrors(
                validate({
                    ...input,
                    platforms,
                    [e.target.name]: e.target.value
                })
            ) 
        }
    }
    function handleCheckGenres(e){
        if (e.target.checked){ //si el input esta check
            setInput({
                ...input,
                genres: input.genres.concat(e.target.value)

            })
            console.log(e.target.value)
            setErrors(
                validate({
                    ...input,
                    genres,
                    [e.target.name]: e.target.value
                })
            ) 
        }
    }

   
   
    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            dispatch(postVideogame(input))
            alert('Videojuego creado con exito')
            setInput({
                name: "",
                description: "",
                released: "",
                background_image:"",
                rating: "",
                platforms: "",
                genres: []
            })
            history.push('/home')

        }
    }

    return (
        <div className="background">
            <div className="avgwrapper">
            <Link to = '/home'>
                <button className = "main">Volver al menu principal</button>
            </Link>
                <h2>Crea tu videojuego</h2>
                <form className="formarea" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre</label>
                        <input
                            type= "text"
                            value = {input.name}
                            name = "name"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    <div>
                        <label>Descripcion</label>
                        <input
                            type= "text"
                            value= {input.description}
                            name = "description"
                            onChange={(e) => handleChange(e)}
                            
                        />
                    </div>
                         {errors.description && (
                            <p className="error">{errors.description}</p>
                        )}
                    <div>
                        <label>Fecha de lanzamiento</label>
                        <input
                            type= "date"
                            value= {input.released}
                            name = "released"
                            onChange={(e) => handleChange(e)}

                        />
                    </div>
                          {errors.date && (
                            <p className="error">{errors.date}</p>
                        )}
                    <div>
                        <label>Rating</label>
                        <input    
                           
                            type= "number"
                            step="any"
                            value ={input.rating}
                            name = "rating"
                            min= "1"
                            max= "5"
                            onChange={(e) => handleChange(e)}

                        />
                    </div>
                          {errors.rating && (
                            <p className="error">{errors.rating}</p>
                        )}
                    <div>
                        <label>Imagen</label>
                        <input
                        type= "text"
                        value= {input.background_image}
                        name= "background_image"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {errors.background_image && (
                            <p className="error">{errors.background_image}</p>
                        )}
                    <label>Generos</label>
                        <div id='genres' className="genres-div">
                            <div>
                                <input name='Strategy' value='1' type="checkbox" id="Strategy" onChange={(e) => handleCheckGenres(e)} />
                                <label >Strategy.</label>
                            </div>
                            <div>
                                <input name='RPG' value='2' type="checkbox" id="RPG"  onChange={(e) => handleCheckGenres(e)}/>
                                <label>RPG.</label>
                            </div>
                            <div >
                                <input name='Indie' value='3' type="checkbox" id="Indie" onChange={(e) => handleCheckGenres(e)} />
                                <label >Indie.</label>
                            </div>
                            <div>
                                <input name='Action' value='4' type="checkbox" id="Action" onChange={(e) => handleCheckGenres(e)} />
                                <label >Action.</label>
                            </div>
                            <div >
                                <input name='Adventure' value='5' type="checkbox" id="Adventure"  onChange={(e) => handleCheckGenres(e)}/>
                                <label >Adventure.</label>
                            </div>
                            <div>
                                <input name='Shooter' value='6' type="checkbox" id="Shooter" onChange={(e) => handleCheckGenres(e)} />
                                <label >Shooter.</label>
                            </div>
                            <div>
                                <input name='Casual' value='7' type="checkbox" id="Casual" onChange={(e) => handleCheckGenres(e)} />
                                <label>Casual.</label>
                            </div>
                            <div>
                                <input name='Simulation' value='8' type="checkbox" id="Simulation" onChange={(e) => handleCheckGenres(e)} />
                                <label >Simulation.</label>
                            </div>
                            <div>
                                <input name='Puzzle' value='9' type="checkbox" id="Puzzle" onChange={(e) => handleCheckGenres(e)} />
                                <label>Puzzle.</label>
                            </div>
                            <div>
                                <input name='Arcade' value='10' type="checkbox" id="Arcade" onChange={(e) => handleCheckGenres(e)} />
                                <label>Arcade.</label>
                            </div>
                            <div>
                                <input name='Platformer' value='11' type="checkbox" id="Platformer" onChange={(e) => handleCheckGenres(e)} />
                                <label>Platformer.</label>
                            </div>
                            <div>
                                <input name='Racing' value='12' type="checkbox" id="Racing"  onChange={(e) => handleCheckGenres(e)}/>
                                <label>Racing.</label>
                            </div>
                            <div>
                                <input name='Massively-Multiplayer' value='13' type="checkbox" id="Massively-Multiplayer" onChange={(e) => handleCheckGenres(e)} />
                                <label>Massively-Multiplayer.</label>
                            </div>
                            <div>
                                <input name='Sports' value='14' type="checkbox" id="Sports" onChange={(e) => handleCheckGenres(e)} />
                                <label>Sports.</label>
                            </div>
                            <div>
                                <input name='Fighting' value='15' type="checkbox" id="Fighting"  onChange={(e) => handleCheckGenres(e)}/>
                                <label>Fighting.</label>
                            </div>
                            <div>
                                <input name='Family' value='16' type="checkbox" id="Family"  onChange={(e) => handleCheckGenres(e)}/>
                                <label>Family.</label>
                            </div>
                            <div>
                                <input name='Board Games' value='17' type="checkbox" id="Board Games"  onChange={(e) => handleCheckGenres(e)}/>
                                <label>Board Games.</label>
                            </div>
                            <div>
                                <input name='Educational' value='18' type="checkbox" id="Educational"  onChange={(e) => handleCheckGenres(e)}/>
                                <label>Educational.</label>
                            </div>
                            <div>
                                <input name='Card' value='16' type="checkbox" id="Card"  onChange={(e) => handleCheckGenres(e)}/>
                                <label >Card.</label>
                            </div>
                        </div> 
                        {errors.genres && (
                                <p className="error">{errors.genres}</p>
                            )} 
                    {/* <div>
                     <label>Generos</label>
                        <select onChange={(e) => handleSelect(e)}>
                            <option>Seleccione genero</option>
                            {genres.map((gen) => (
                                <option key = {gen.id} value = {gen.id} >{gen.name}</option>
                        ))}
                        
                                
                        </select>
                        <div className='divContenedorGenre' id="divContenedor" ></div>

                         {input.genres.map(el => 
                            <div>
                                <p key={el}>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                            </div>
                        )}  
                   
                        </div>  */}
                    

                    <div>
                        <label>Plataformas</label>
                        <div id='platforms' className="plat-div">
                            <div>
                                <input name='PC' type="checkbox" value="PC" onChange={(e) => handleCheckPlatforms(e)} />
                                <label htmlFor="PC">PC.</label>
                            </div>
                            <div>
                                <input name='iOS' type="checkbox" value="iOS" onChange={(e) => handleCheckPlatforms(e)} />
                                <label htmlFor="iOS">iOS.</label>
                            </div>
                            <div>
                                <input name='Android' type="checkbox" value="Android"  onChange={(e) => handleCheckPlatforms(e)}/>
                                <label htmlFor="Android">Android.</label>
                            </div>
                            <div>
                                <input name='macOS' type="checkbox" value="macOS" onChange={(e) => handleCheckPlatforms(e)} />
                                <label htmlFor="macOS">macOS.</label>
                            </div>
                            <div>
                                <input name='PlayStation 4' type="checkbox" value="PlayStation 4" onChange={(e) => handleCheckPlatforms(e)} />
                                <label htmlFor="PlayStation 4">PlayStation 4.</label>
                            </div>
                            <div>
                                <input name='PlayStation 5' type="checkbox" value="PlayStation 5"  onChange={(e) => handleCheckPlatforms(e)}/>
                                <label htmlFor="PlayStation 5">PlayStation 5.</label>
                            </div>
                            <div>
                                <input name='XBOX' type="checkbox" value="XBOX" onChange={(e) => handleCheckPlatforms(e)} />
                                <label htmlFor="XBOX">XBOX.</label>
                            </div>
                            <div>
                                <input name='PS Vita' type="checkbox" value="PS Vita" onChange={(e) => handleCheckPlatforms(e)}/>
                                <label htmlFor="PS Vita">PS Vita.</label>
                            </div>
                        </div>
                    </div>
                        {errors.platforms && (
                            <p className="error">{errors.platforms}</p>
                        )}
                    <br/>
                    <input className= "input"type = 'submit'  disabled = {Object.keys(errors).length === 0?false:true}/>
                </form>
           
            </div>
        </div>
    )
}