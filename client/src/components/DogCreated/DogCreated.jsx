import React from 'react';
import {Link } from 'react-router-dom';
import {postDogs, getTemperaments} from '../../actions/index';
import {useDispatch,useSelector} from 'react-redux' 
import {useState, useEffect} from 'react';
import image from '../imagen/dog22.jpg'

export default function DogCreated (){ 
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament)
    const [temps, setTemps] = useState([])    

    const [input,setInput] = useState({
        name: "",        
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        life_span:'',
        image:"",
        temperament: [],
    })

    useEffect(() => {
        dispatch(getTemperaments());
        dispatch(postDogs());       
     },[dispatch]);

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
       
    };
    function handleSelect(e) {
        if(input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: input.temperament.filter(temp => temp !== e.target.value)
            })
        }
        else{
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    
    }

    // function handleClick(e){
    //     e.preventDefault()
    //     setTemps(temps.filter(t => t !== e.target.value))
    // }
    function handleDelete(e) {
        setInput({
          ...input,
          temperament: input.temperament.filter((temps) => temps !== e),
        });
      }

    function handleSubmit(e) {
       
        e.preventDefault()
        
        const addDog= {
            name: input.name,
            height: `${input.min_height} - ${input.max_height}`,
            weight: `${input.min_weight} - ${input.max_weight}`,
            life_span: input.life_span,
            image: input.image,
            temperament: input.temperament
        }
        dispatch(postDogs(addDog))
       
       setInput({
        name: "",        
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span:'',
        life_span: '',
        image:'',
        temperament: [],
        


    })
        setTemps([])
        
    }

    return (
        <div>
         <div>          
            <form onSubmit ={handleSubmit}>
                <fieldset>
                    <legend>Create your Doggy</legend>
                        <div>
                            <input 
                                key = "name"
                                placeholder='Name'
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={handleChange}
                                required>                                  
                            </input>
                        </div>
                        <div >
                                <input onChange={handleChange} 
                                name="min_weight" 
                                type="min_weight" 
                                value={input.min_weight} 
                                placeholder='Min_weight'
                                required/>
                                <input onChange={handleChange}  
                                name="max_weight" 
                                type="max_weight" 
                                value={input.max_weight} 
                                placeholder='Max_weight'
                                required/>
            
                        </div>
                      
                        <div>
            
                                <input onChange={handleChange} 
                                name="min_height" 
                                type="min_height"
                                value={input.min_height} 
                                placeholder='Min-height'
                                required/>
                                <input  onChange={handleChange} 
                                name="max_height" type="max_height" 
                                value={input.max_height} 
                                placeholder='Max-height'
                                required/>
                                
                        </div>
                        <div >
                            <input 
                                
                                placeholder='Life Span'
                                type='text'
                                name='life_span'
                                value={input.life_span}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <div>
                            <input 
                                
                                placeholder='Image'
                                type='text'
                                name='image'
                                value={input.image}
                                onChange={handleChange}
                                >   

                            </input>
                        </div>
                        <div>  

                        <select name="temperaments" 
                                onChange={handleSelect}  
                                type="text" >
                                <option value={input.temperament}></option>
                                    {temperament.map((e, id)=>{
                                    return (
                                <option key={id} value={e.name}>{e.name}</option>
                                        )
                                    })}
                                </select>
                
                                { input.temperament.map((e, id) =>{
                                    return ( 
                                        <React.Fragment key={id}> 

                                            <div>{e}
                                            {/* <button value={e} onClick={(e)=>handleClick(e)}>X</button> */}
                                            <button onClick={() => handleDelete(e)}>X</button>
                                            </div>

                                        </React.Fragment>
                                        )
                                    })    
                               }
                        </div>

                        <button 

                            type= "submit" 
                            name= "submit" 
                            >Create
                        </button>
                        <Link to='/home'><button>Back</button></Link><br/>                
                        <img src={image} alt='not found'/>
                </fieldset>                
            </form>
        </div>
        </div>
    )

}