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
//No se sabe cuanto se demora la respuesta, por eso se le avisa que tiene que esperar 
//-----------------------------------/videogames and videogames?name=-------------------------------------------------

router.get('/videogames', async (req, res) => {
    const {name} = req.query;
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parseo el objeto
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
 

    if(name){
        try{
            let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
            if (!response.data.count) return res.status(404).json(`Este juego ${name} no fue encontrado`);
            const gameFind = response.data.results.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    genres: game.genres.map(e => e.name).join(', ')
                }
            });
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
            const results = [...filteredGamesDb, ...gameFind.splice(0, 15)];
            return res.json(results);
        }catch(err){
            console.log(err)
        }
    }else{
        try{
            let result = [...videogamesDb]//Lo que esta en la base de datos
            let response = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            const allGames = response.data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                genre: game.genres.map(e => e.name)

            }
        });
        result = [...result,...allGames];
        response = await axios.get(response.data.next)
        return res.json(result)
        }catch(err){
            console.log(err)
            return res.status(500)
        }    
    }
})

//----------------------------------------videogame/id--------------------------------------------------------------
//Search a videogame by id
router.get('/videogame/:id', async (req, res) => {  
    const {id} = req.params;
    try {
      if (!isNaN(id)){
    //Search videogame in the Api
         var idkey = parseInt(id)
         const result = await axios.get(`https://api.rawg.io/api/games/${idkey}?key=${API_KEY}`)
         if (result.data.id) {
           
            const infoApi = {
              name: result.data.name,
              platforms: result.data.platforms.map(e => e.platform.name).join(', '),
              released: result.data.released, 
              image: result.data.background_image,
              description: result.data.description.replace(/<[^>]+>/g, ''),
              rating: result.data.rating,
              genres: result.data.genres.map(e => e.name).join(', ')
            }

            return res.status(200).json(infoApi)
         }
      }
  //Search videogame in local Database  
      var searchdbvg  = await Videogame.findByPk(id, {
          include: [{
             model: Genre,
             attributes: ['name'],
             through: {
               attributes: []
             }
          }]
      });
       
      if (searchdbvg) {
        
         const objdbgame = {
            name: searchdbvg.name,
            platforms: searchdbvg.platform, //platform
            released: searchdbvg.reldate, //reldate
            image: "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg",
            description: searchdbvg.description,
            rating: searchdbvg.rating,
            genres: searchdbvg.genres.map(e => e.name).toString()
         }
         return res.status(200).json(objdbgame)
      }  
      return res.status(404).send('Videogame not found');
    } catch (error) {
      res.send(`Error in Rute /videogames:id ${error}`);
    }
  });

  //-------------------------------POST VIDEOGAME ---------------------------------------------------------------
  router.post('/videogames', async (req, res) => {
    let {
        name, 
        description,
        image,
        date,
        rating,
        platforms,
        genre,
        createdInDb
    } = req.body;
    platforms = platforms.toString();
    // console.log(req.body);

    let gameCreated = await Videogame.create({
        name, 
        description,
        image,
        date,
        rating,
        platforms,
        createdInDb
    })

    let genressDb = await Genre.findAll({where: {name: genre}})
    gameCreated.addGenre(genressDb)
    res.send('Videojuego creado con exito')
});
//--------------------------------------get genres--------------------------------------------------------------
router.get('/genres', async (req, res) => {
    //traer los generos de la api y guardarlos en la db
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
