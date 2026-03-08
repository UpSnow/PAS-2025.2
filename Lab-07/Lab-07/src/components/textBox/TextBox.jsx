import React from "react";
import './TextBox.css'

const TextBox = ({ placeholder, nome, value, onChange, required }) => {




    return (
        <div className="div-TextBox">
            <label
                className="label-TextBox"
                for="TexBox "
            >{nome}
            </label>
            <input className="input-TextBox"
                id='TexBox'
                placeholder={placeholder ? placeholder : 'Caixa de Texto'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required= {required}
            >

            </input>
        </div>

    )

}

export default TextBox