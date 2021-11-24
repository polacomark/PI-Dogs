import React from 'react';
import { NavLink, Link} from 'react-router-dom'
import { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDogs, getTemperaments,
    byOrder,
    byOrderWeight,
    filterDogsCreated,
    filterByTemp
} from '../../actions/index';
import Card from '../Card/Card';
import Paginado from '../Paginado';
import SearchBar from '../SearchBar';
import style from './Home.module.css'



export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperament=useSelector((state)=>state.temperament)
    //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage ] = useState(8);//setDogsPerPage
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);

const pagedTotal = (numPages) => {
    setCurrentPage(numPages);
};

const [,setOrder] = useState(" ");
    
useEffect(() => {
   dispatch(getDogs());
}, [dispatch]);

useEffect(()=>{
    dispatch(getTemperaments())
  },[dispatch]);

function handleClick(e){
e.preventDefault();///es para que no se recargue la pagina del redux
dispatch(getDogs());
 }
 function handleFilter(e) {
  e.preventDefault();
  dispatch(filterDogsCreated(e.target.value));
}
 function handlefilterByTemp(e){
    e.preventDefault();
    dispatch(filterByTemp(e.target.value))
  } 
  //console.log(temperaments) 

  function handleOrder(e) {
    e.preventDefault();
    dispatch(byOrder(e.target.value));
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }
  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(byOrderWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

return(
    <div className={style.constainsAll}>
      <div >
        <div className={style.created}>
        <button>
        <Link to='/dog'>
          AGREGAR NUEVO</Link>
          </button>
          </div>
      <div className={style.head}>
         <h1>DOGOOGLE</h1>
        </div>
   
        <button onClick={(e) => handleClick(e)}>
           VOLVER A CARGAR LA PAGINA
        </button>
            </div>
        <p>
        <SearchBar></SearchBar>
        </p>
        
        <div>
        <select onChange={ handleOrder}>
                <option value="asc">Ascending order</option>
                <option value="desc" >Descending order</option>
            </select>
            <select onChange={ handleOrderByWeight}>
              <option value="Weight 1">Order by Smalls</option>
              <option value="Weight 2">Order by Bigs</option>
            </select>
            <select onChange={handlefilterByTemp}>
            <option value="All">Temperament</option>
            {temperament?.map((e)=>{
              return(
                <option value={e.name} key={e.id}>{e.name}</option>
                )
              })}
            </select>
            <select onChange={(e)=>handleFilter(e)}>
               <option value="All">Todos</option>
               <option value='Created'>Creados</option>
             </select>
             <div className={style.pagination}></div>      
             <Paginado 
               dogsPerPage={dogsPerPage} allDogs={allDogs.length} pagedTotal={pagedTotal}
               />
               
               </div> 
      
            {currentDog?.map((c)=>{  ///PREGUNTO Y MAPEO
               console.log(c.id)
               return(
                  <div className={style.Card}>
                    <NavLink to={"/home" + c.id}>
                      <Card name={c.name} 
                      image={(c.image) || null}  
                      temperament={c.temperament}
                       weight={c.weight} 
                       key={c.id}
                       />
                    </NavLink>
                    </div>
              )
            })
          }
    </div>

);
}