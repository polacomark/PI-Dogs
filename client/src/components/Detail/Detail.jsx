import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../../actions/index";
import image from '../imagen/dog.png'
import style from './Detail.module.css'

export default function Detail (props) {
    const dispatch = useDispatch();

    const {id} = props.match.params;
    
    useEffect(() => {
        dispatch(dogDetail(id))
    }, [id,dispatch]);
    
    const myDog = useSelector((state) => state.detail);
    //console.log(myDog)

    return (
        <div className={style.all}>
        <div className={style.contenedor}>
        {
        myDog.length > 0 ? 
        <div>
            <h2>{myDog[0].name}</h2>
            <img className={style.image} src={myDog[0].image? myDog[0].image: image} alt="Not found"></img>
            <p> Height: {myDog[0].height} (In)</p>
                <p> Weight: {myDog[0].weight} (Lb)</p>
                <p> Life Span: {myDog[0].life_span}</p>
                <h4>Temperaments: {myDog[0].temperament }</h4>
        </div> : 
    <h2>Loading...</h2>
    } 
    <div>
        <Link to= '/home'><button>Back</button></Link>
    </div>
    </div>
    </div>
              
    )
};