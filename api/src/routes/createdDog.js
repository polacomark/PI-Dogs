// // POST /dog:
// // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// // Crea una raza de perro en la base de datos

// const{Router}=require('express');
// const router=Router();
// const{Dog, Temperament}=require('../db.js'); 

// router.post('/dog',async(req,res)=>{
//     let{
//         name,
//         height,
//         weight,
//         life_span,
//         image,
//         createInDb,
//         temperament
//     }=req.body //info que recibo por body

//     let dogCreated=await Dog.create({
//         name,
//         height,
//         weight,
//         life_span,
//         image,
//         createInDb
//     }) 
//     let dogDb=await Temperament.findAll({
//         where:{name:temperament}
//     });
//     dogCreated.addTemperament(dogDb);
//     res.send('Your dog is ready')
// });

// module.exports=router;