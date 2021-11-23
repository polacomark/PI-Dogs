// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const { DataTypes, UUID } = require('sequelize');
require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const cors = require("cors");
const router = Router();
router.use (cors({origin:"http://localhost:3000", credentials: true}));

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

const apiData=async()=>{ //función asincrónica 
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=2fdfa937-4b8f-4340-b9b9-9e2d3d09c88e`);
    const apiInfo = await apiUrl.data.map(e=>{ //mapeo (recorro) la api y tomo los siguientes datos:
        return{
            id:e.id,
            name:e.name,
            height:e.height.imperial, //los traje en sistema métrico imperial (la otra opción era métrico)
            weight:e.weight.imperial,
            life_span:e.life_span,
            image:e.image.url,
            temperament:e.temperament
        }
    });
    return apiInfo;
};
//encontrar todos los perros que incluyan...
const infoDB = async()=>{ 
    let dbDogs = await Dog.findAll({ include: Temperament });
        dbDogs = dbDogs.map((e) => {
            return {
                id: e.dataValues.id,
                name: e.dataValues.name,
                height: e.dataValues.height,
                weight: e.dataValues.weight,
                life_span: e.dataValues.life_span,
                temperament: e.dataValues.temperament
            };
        });
    // let DBinfo = await Dog.findAll({
    //     include:{
    //         model:Temperament,
    //         attributes:['name'],
    //         through:{
    //             attributes:[]
    //         },
    //     }
    // });
    return dbDogs;
 };
  
//concatenar los datos de api y los de db
const allDogs=async()=>{
    const apiInfo=await apiData();
    const dbInfo=await infoDB();
    const totalInfo=apiInfo.concat(dbInfo);
    return totalInfo;
};

router.get('/dogs', async(req, res)=>{
  const name = req.query.name
  let dogsTotal = await allDogs();
  if(name){
    let dogsName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()));
    dogsName.length ?
    res.status(200).send(dogsName) :
    res.status(404).send('no esta el dog')
  }else{
      res.status(200).send(dogsTotal)
  }

});

router.get('/temperament',async(req,res)=>{
    var tempsEnds = []; //va a contener los temperamentos por separado (en la API viene como string)
    const apiTemperament = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=2fdfa937-4b8f-4340-b9b9-9e2d3d09c88e`);
    const temperaments = apiTemperament.data.map(t => t.temperament);//agarro lo que este en temperament en la api
    let tempSplit = temperaments.map(e => e && e.split(","))  //separo por comas, por que en la api vienen como un string
    let tempArray = tempSplit.flat().sort()//.flat() crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente./.sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.
    tempArray.map(el => { //mapeo los elementos del array
        if (el !== undefined) { //si no hay saco ese espacio
            let tempTrim = el.trim()//.trim( ) elimina los espacios en blanco en ambos extremos del string.
            tempsEnds.push(tempTrim) //pusheo sin los espacios vacios      
        }        
    }); 
    let finalArrayTemps = tempsEnds.filter((item,index)=>{ 
        return tempsEnds.indexOf(item) === index;
      }) 
    
    // console.log(finalArrayTemps)
       
    for (let i = 0 ; i < finalArrayTemps.length ; i++) {
        Temperament.findOrCreate({
            where: {name: finalArrayTemps[i]}
        }) //si no lo encuetro lo creo
    };    
        
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments)

});
// router.get('/temperament', async(req, res)=>{
//     const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=2fdfa937-4b8f-4340-b9b9-9e2d3d09c88e`)
//     const temperaments = tempApi.data.map(el => el.temperament)
//     const tempEach = temperaments.map(el=>{
//         for(let i=0; i<el.length; i++)
//             return el[i]
//         })
//         //console.log(tempEach)
        
//         tempEach.forEach(el=>{
//             Temperament.findOrCreate({
//                 where: { name: el}
//             })
//         })
    
//     const allTemperament = await Temperament.findAll();
//     res.send(allTemperament);
// })

router.post('/dog',async(req,res)=>{
    let{
        name,
        height,
        weight,
        life_span,
        image,
        createInDb,
        temperament
    }=req.body //info que recibo por body
    try{
        let dogCreated=await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
            createInDb,
            temperament
        }) 
        let dogDb = await Temperament.findAll({
            where:{name:temperament}
        });
        await dogCreated.addTemperament(dogDb);
        res.send('Creado')
    }catch(error){
        res.send(error)
    }
    
});

router.get('/dogs/:id', async (req, res) => {
        const {id} = req.params; 
        const dogsTotal = await allDogs();
        if(id){
            let dogsId = await dogsTotal.filter(d => d.id == (id)); //traigo los perros que coincidan
            dogsId.length ? 
            res.status(200).send(dogsId) ://si no mensaje de error
            res.status(404).send('no se encontro')
        }
    });   



module.exports={
    apiData,
    infoDB,
    allDogs,
   
    //router
};
module.exports = router;
