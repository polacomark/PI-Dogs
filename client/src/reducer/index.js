// Seteo el estado inicial
//import axios from 'axios';

const initialState = {
    dogs : [],
    allDogs : [],   
    orderDogs : [],
    weightDogs : [], 
    temperament : [],
    detail : [],

};


function rootReducer(state = initialState, action) { 
   //cambio dependiendo del tipo de acción
    switch (action.type) {
        case 'GET_DOGS': //traigo todos los perros
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        case 'GET_TEMPERAMENTS': //traigo todos los temperamentos
        
            return {
                ...state,
                temperament: action.payload,

            };
            
        case 'FILTER_DOGS_CREATED'://filtro por si el perro es de la api o de la base de datos
        //si el valor de mi acción es created, traigo todos aquellos creados en la DB  
            const dogsFiltered = action.payload === 'Created' ? state.allDogs.filter(d => d.createInDb) : state.allDogs.filter(d => !d.createInDb);
            return {//retorno el estado, y si mi acción vale All traigo los de la api y los filtrados
                ...state,
                dogs: dogsFiltered

            };          
        
        case 'DOG_DETAIL'://cuando toco un perro traigo sus detalles
            return {
                ...state,
                detail: action.payload
            };

        case 'GET_NAME_DOGS'://traigo la raza buscada
            return {
                ...state,
                dogs: action.payload
            };

        case 'POST_DOGS': //creo una raza
            return {
                ...state,

            }
            
        case 'ORDER': //orden alfabetico  
            const orderDogs = action.payload === 'Asc' ? //si el value es 'Asc'
            state.dogs.sort(function(a, b) { //ordeno los dogs de A a Z
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) ://si no (osea que vale='Desc') ordeno de Z a A
            state.dogs.sort(function(a, b) {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            return {    //retorno los perros ordenados
                ...state,
                dogs: orderDogs
            };

            case 'ORDER_WEIGHT': //ordeno por peso
               
                const weightDogs = action.payload === 'Weight 1' ? //si es ese valor  se ordena de menor peso a mayor
                state.dogs.sort(function(a, b) { //el tipo de dato de weight es un string
                    if(typeof action.payload.weight === 'string'){
                        if (a.weight > b.weight) return 1
                        if (a.weight < b.weight) return -1
                        return 0;
                    } else {//si no  lo vuelvo num para la comparativa
                        if (parseInt(a.weight) > parseInt(b.weight)) return 1
                        if (parseInt(a.weight) < parseInt(b.weight)) return -1
                        return 0;
                    }
                }) :
                //si el valor de la acción no es 'weight 1' 
                state.dogs.sort(function(a, b) {//ordeno de mayor a menor
                    if(typeof action.payload.weight === 'string'){
                        if (a.weight > b.weight) return -1
                        if (a.weight < b.weight) return 1
                        return 0;
                    } else {
                        if (parseInt(a.weight) > parseInt(b.weight)) return -1
                        if (parseInt(a.weight) < parseInt(b.weight)) return 1
                        return 0
                    }
                }); 
                return { //devuelvo los dogs ordenados
                    ...state,
                    dogs: weightDogs
                }
            case 'DOG_FILTER_BY_TEMPERAMENT':
                // const filterByTemp = action.payload === 'All'
                // ? state.allDogs
                // : state.allDogs.filter((c)=>c.temperament && c.temperament.filter((a)=>
                //     a.name === action.payload))
                
                let filterByTemp;
                if(action.payload==='All'){
                    filterByTemp=state.allDogs;
                }else{
                    filterByTemp = state.allDogs.filter((d)=>d.temperament).filter((dfiltered)=>dfiltered.temperament.includes(action.payload));
                    // filterByTemp=state.allDogs.filter((dFilter)=>dFilter.temperament.includes(action.payload))
                    
                    // filter((d)=>d.temperament.includes(action.payload)
            }
                return{
                    ...state,
                    dogs: filterByTemp
                };
        default: 
            return state;
    }
};
export default rootReducer;