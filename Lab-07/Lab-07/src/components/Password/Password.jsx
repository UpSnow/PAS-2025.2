import React from "react";
import './Password.css'



const Password = ({ nome, type = 'password', value, onChange ,required }) => {

    return (
        <div className="Password">
            <label
                className="label-Password"
                htmlFor="Password">{nome}</label>
            <input
                className="input-Password"
                id="Password" type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}>

                </input>

        </div>


    )
}

export default Password