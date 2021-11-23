
import axios from 'axios';


export function getDogs(){ //esta función obtiene los datos de los perros
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS', 
            payload: json.data
    
        }) 
    }; 
};
export function dogDetail(id) { //traigo los detalles del perro con esa id
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dogs/' + id);
            return dispatch({
                type: 'DOG_DETAIL', 
                payload: json.data
            })
        } catch (error){
            console.log(error);
        }
    }
};


export function getNameDogs (name){ //traigo los perros que coincidan con ese name pasado por query
    return async function(dispatch) { 
        var json = await axios.get("http://localhost:3001/dogs?name=" + name );
        return dispatch({
            type: 'GET_NAME_DOGS',
            payload: json.data
        });

    };    
}; 

export function getTemperaments() {
    return async function (dispatch){//traigo los temperamentos (TODOS)
        try{
            var json = await axios.get("http://localhost:3001/temperament/");
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data

        });
        }catch(error){
            console.log(error)
        }
    }
};

export function filterDogsCreated (payload){ //filtro por si son creados o de la api
    return {
        type: 'FILTER_DOGS_CREATED',
        payload
    }
};


export function postDogs(payload) { //me manda la info posteada
    return async function (dispatch){
        var json = await axios.post("http://localhost:3001/dog/",payload); 
        
        return json;

    }
}


export function byOrder(payload) { //ordeno alfabeticamente
    return {
        type: 'ORDER',
        payload
    }
}; 

export function byOrderWeight(payload) {//ordeno por tamaño
    return {
        type: 'ORDER_WEIGHT',
        payload
    }
};
export function filterByTemp(payload){//filtro por temperamento
    return{
        type:'DOG_FILTER_BY_TEMPERAMENT',
    payload
    }
};