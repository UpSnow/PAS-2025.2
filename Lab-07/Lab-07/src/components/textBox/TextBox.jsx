import React from "react";
import './TextBox.css'

const TextBox = ({ placeholder, nome, value, onChange,id, required }) => {




    return (
        <div className="div-TextBox">
            <label
                className="label-TextBox"
                htmlFor={id}
            >{nome}
            </label>
            <input className="input-TextBox"
                id={id}
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