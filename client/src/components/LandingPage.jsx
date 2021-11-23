import React from 'react';
import {NavLink} from 'react-router-dom';


export default function LandingPage() {
    return(
        <div>
            <h1>Individual Project - Henry DOGs</h1>
            <NavLink to="/home" ><img className="logo" src= "https://raw.githubusercontent.com/cesca2092/PI-DogsHenry/main/client/src/components/LandingPage/landingpage.png" alt="doglogo" width= '950px' height= '550px' /></NavLink>
        </div>
    )
}