//GET/dogs
// GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

// const {Router} = require('express');
// const router=Router();
// const{allDogs}=require('../utilis/dataDogs');


// router.get('/dogs',async(req,res)=>{
//     const {name}=req.query;  //recibo la raza por query
//     const totalDogs=await allDogs(); //Espero todos los perros traidos de la api y de la base de datos(pre concatenados en el archivo dataApi)
//     if(name){
//         let dogName=await totalDogs.filter(d=>d.name.toLowerCase().includes(name.toLowerCase())); //pregunto si esa raza existe y con .filter() traigo las coincidencias que incluyan esa raza
   
//       dogName.length ?  //si tengo algo
//         res.status(200).send(dogName) : //lo envio, si no
//         res.status(404).send('no encontrado') //mensaje de error
//     }else {
//         res.status(200).send(totalDogs); //por defecto manda todos los perros(de spi o de la base)
//     }
// });
// module.exports=router;