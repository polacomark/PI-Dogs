import React from 'react';

export default function Paged({dogsPerPage, allDogs, pagedTotal}){
    const numPages = []

    for(let i=0; i<= Math.ceil(allDogs/dogsPerPage); i++){
        numPages.push(i+1)
    }
    return(
        <div className= 'pagination'>
                 <label>PAGES: </label>
            { numPages.length > 1 &&
                numPages.map(number => (
                    <button onClick={()=>pagedTotal(number)} className='number' key={number}>{number}</button>
                ))
            } 
            {/* <ul className='pagedTotal'>
               {numPages && 
               numPages.map(number =>(
                    <li className='number' key={number}>
                        <a onClick={(e)=> pagedTotal(number)}>{number}</a>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

