import React from "react";  
import "./Button.css"



const Button = ({text, onClick , variant = 'send', type='button', className= '' }) =>{

    return (
        <button className={`btn btn--${variant} ${className}`} onClick= {onClick} type={type} >
            {text}
            
        </button>

    )
}

export default Button