
// GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

// const {Router}=require('express'); 
// const router=Router();
// const{ Temperament }=require('../db'); //traigo los temperamentos de la DB
//require("dotenv").config();
//const axios =require('axios'); //Axios es una libreria de JS que nos permite hacer solicitudes al servidor y recibir respuestas
//const{API_KEY}=process.env;

// router.get('/temperament', async(req, res)=>{
//     try{
//         apiTempResponse = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=2fdfa937-4b8f-4340-b9b9-9e2d3d09c88e")
//         let apiTemp = apiTempResponse.data.results;
//         let tempArr = []
//         if(tempArr.length){
//             for(let i=0; i<apiTemp.length; i++){
//                 tempArr.push(apiTemp[i]);
//             }
//         }
//         let filterTemp = tempArr.map(async (e)=>{
//             const temperament = await Temperament.findOrCreate(
//                 {where:{name: e.name}
//             })
//         })
//         console.log(temperament)

//         const dbTemp = await Temperament.findAll();
//         res.status(200).send(dbTemp)
//     }catch(error){
//         console.log(error)
//     }
// })

// router.get('/temperament',async(req,res)=>{
//     var tempsEnds = []; //va a contener los temperamentos por separado (en la API viene como string)
//     const apiTemperament = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=2fdfa937-4b8f-4340-b9b9-9e2d3d09c88e`);
//     const temperaments = apiTemperament.data.map(t => t.temperament);//agarro lo que este en temperament en la api
//     let tempSplit = temperaments.map(e => e && e.split(","))  //separo por comas, por que en la api vienen como un string
//     let tempArray = tempSplit.flat().sort()//.flat() crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada./.sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.
//     tempArray.map(el => { //mapeo los elementos del array
//         if (el !== undefined) { //si no hay saco ese espacio
//             let tempTrim = el.trim()//.trim( ) elimina los espacios en blanco en ambos extremos del string.
//             tempsEnds.push(tempTrim) //pusheo sin los espacios vacios      
//         }        
//     }); 
//     let finalArrayTemps = tempsEnds.filter((item,index)=>{ 
//         return tempsEnds.indexOf(item) === index;
//       }) 
    
//     // console.log(finalArrayTemps)
       
//     for (let i = 0 ; i < finalArrayTemps.length ; i++) {
//         Temperament.findOrCreate({
//             where: {name: finalArrayTemps[i]}
//         }) //si no lo encuetro lo creo
//     };    
        
//     const allTemperaments = await Temperament.findAll();
//     res.send(allTemperaments)

// });

 //module.exports = router;