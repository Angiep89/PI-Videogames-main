const { Router } = require('express');
const axios = require ('axios');
const {Genre, Videogame} = require('../db')
require('dotenv').config();


const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// //No se sabe cuanto se demora la respuesta, por eso se le avisa que tiene que esperar 
const datos = async ()=>{
    const arreglo1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const arreglo2 = await axios.get(arreglo1.data.next)
    const arreglo3 = await axios.get(arreglo2.data.next)
    const arreglo4 = await axios.get(arreglo3.data.next)
    const arreglo5 = await axios.get(arreglo4.data.next)
    
    const arr1= arreglo1.data.results.concat(arreglo2.data.results)
    const arr2= arr1.concat(arreglo3.data.results)
    const arr3= arr2.concat(arreglo4.data.results)
    const arr4= arr3.concat(arreglo5.data.results)

    
    // const infoSimpleApi = arr4.map(function(datos) {const info={
    //     id: datos.id,
    //     name: datos.name,
    //     genres: datos.genres.map(genero=> genero.name),
    //     background_image: datos.background_image,
    //     rating: datos.rating,
    //     platforms: datos.platforms?.map((el) => el.platform.name)
    // } 
    //     return info
    // })

     const infoSimpleApi = arr4.map((datos) => {
        return {

            id: datos.id,
            name: datos.name,
            genres: datos.genres.map(genero=> genero.name).join(' | '),
            background_image: datos.background_image,
            rating: datos.rating,
            platforms: datos.platforms?.map((el) => el.platform.name)
        }
    } 
    )
    let juegosDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ['name'],
             through: {
                attributes: []
             }
        },
      })
      console.log('juegooos', juegosDB)
   

        let juegosDBSimple= juegosDB.map((datos) => {
            return {
                id: datos.id,
                name: datos.name,
                genres: datos.Genres.map(g => g.name).join(' | '),
                background_image: datos.background_image,
                rating: datos.rating,
                platforms:datos.platforms,
                createdinDb: datos.createdinDb
                // genrestr.toString()
            }
        } 
        )
    let allGames = [...juegosDBSimple, ...infoSimpleApi]
   
    return allGames;
}          

const juegos = async (name)=>{
    let busquedaApi = await axios.get(`https://api.rawg.io/api/games?search=${name}?&key=${API_KEY}`)
    const infoSimpleApi = busquedaApi.data.results?.map((datos) => {
        return {
            id: datos.id,
            name: datos.name,
            genres: datos.genres.map(genero=> genero.name).join(' | '),
            background_image: datos.background_image,
            rating:datos.rating
         }
    })

 
    let juegosDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ['name'],
             through: {
                attributes: []
             }
        },
      })

  
    let juegosDBSimple= juegosDB.map((datos)=> {
        return {
            id: datos.id,
            name: datos.name,
            genres: datos.Genres.map(g => g.name).join(' | '),
            background_image: datos.background_image,
            rating: datos.rating,
            platforms:datos.platforms,
            createdinDb: datos.createdinDb

        }
    })
    let allGames = [...juegosDBSimple, ...infoSimpleApi]

    return allGames;

}

const detail = async (id)=>{
    if(id.length<7){
        const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?&key=${API_KEY}`)
        const infoSimpleApi = {
                id: detalle.data.id,
                name: detalle.data.name,
                description: detalle.data.description_raw,
                rating: detalle.data.rating,
                genres: detalle.data.genres,
                platforms: detalle.data.platforms.map((p) => p.platform.name).join(", "),
                background_image: detalle.data.background_image,
                released: detalle.data.released
                } 
        return infoSimpleApi
    }
    // const juego = await Videogame.findByPk(id, {
    const juego = await Videogame.findOne({
        where:{
            id:id
        },
        include:[
        {
            model:Genre,
            attributes:["name"],
            through: {
                attributes: []
              }
        }]
    })
    return juego
}


// //-----------------------------------/videogames and videogames?name=-------------------------------------------------

router.get('/videogames', async (req, res) => {
    try{
        const {name}= req.query
        const totalJuegos= await datos()
        if(name){
            const busqueda= await juegos(name)
            const resultado = busqueda.filter(item=>item.name.toLowerCase().includes(name.toLowerCase()))
            const results = [...resultado.splice(0, 15)];
            results.length? res.status(200).json(results): res.status(404).json("No existe ese videojuego")
        }
        else{
            res.json(totalJuegos)
        }
    }
    catch(e){
        console.log(e)
    }
})

//----------------------------------------videogame/id--------------------------------------------------------------
router.get('/videogame/:id', async(req, res)=>{
    try{
        const {id}= req.params
        const detalleJuego= await detail(id)
        res.json(detalleJuego)
    }
    catch(e){
        res.json(e)
    }
})


  //-------------------------------POST VIDEOGAME ---------------------------------------------------------------
  router.post('/videogames', async(req, res)=>{
    try{
        const {name, description, released, rating, platforms, background_image, genres, createdinDb} = req.body
      
        let buscarDB = await Videogame.findOne({
            where:{
                name:name
            },})
        if(buscarDB){
            throw 'Juego en existencia'
        }
        // const generoGuardar= await Genre.findAll({where:{
        //     name:genres,
        // }})
        const nuevoVideojuego= await Videogame.create({
            name, 
            description,    
            released,
            rating,
            platforms,
            background_image,
            createdinDb
        })
        nuevoVideojuego.addGenres(genres)
        res.json(nuevoVideojuego)
    } 
    catch(e){
        res.json(e)
    }
})




//--------------------------------------get genres--------------------------------------------------------------
// export const getGenres = async  () => {
//     try{
//         const allGenres = await Genre.findAll()
//         if(!allGenres.length){
            
//             const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
//             // genresAPI.data.results.forEach(p => {
//             //     Genre.findOrCreate({
//             //         where: { name: p.name }
//             //     })
//             // })
//             // const genresDB = await Genre.findAll()
//             const genresDB = await Genre.bulkCreate(genresAPI.data.results)
//             res.json(genresDB)
//     }
//     }  catch(e){
//         console.log(e)
//     }
// }



router.get('/genres', async (req, res) => {
    //traer los generos de la api y guardarlos en la db
    // try {    
    //     const vgGenres = await Genre.findAll({
    //      attributes: ['name']
    //     })
    //     let dbGenres = vgGenres.map(p => p.name)        
    //     res.status(200).send(dbGenres);
    //  } catch (error) {
    //      res.send(`Error in route /genres ${error}`);
    //  } 
    try{
        
            
            const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            genresAPI.data.results.forEach(p => {
                Genre.findOrCreate({
                    where: { name: p.name }
                })
            })
            const genresDB = await Genre.findAll()
            res.json(genresDB)

    } catch (err) {
        res.status(404).json({ err })
    }
})


module.exports = router;
