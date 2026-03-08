import React, { useState } from "react";
import './Form.css'


import TextBox from '../textBox/TextBox'
import Password from '../Password/Password'
import Button from '../Button/Button.jsx'

import lab from "../../assets/lab.png"



const Form = () => {

    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")


    const Enviar = (e) => {

        alert('Formulário enviado!')


        setNome('')
        setSobrenome('')
        setEmail('')
        setSenha('')
    }


    const Cancelar = () => {
        alert('Cancelado!')


        setNome("")
        setSobrenome('')
        setEmail('')
        setSenha('')
    }

    return (

        <form onSubmit={Enviar} className="Form">
            <img src={lab} className="form-img"></img>
            <h1>Formulario com React</h1>
            <TextBox
                nome={'Nome'}
                id={'Nome'}
                value={nome}
                onChange={setNome}
                required

            ></TextBox>
            <TextBox
                nome={'Sobrenome'}
                id={'Sobrenome'}
                value={sobrenome}
                onChange={setSobrenome}
                required
            ></TextBox>
            <TextBox
                nome={'E-mail'}
                id={'E-mail'}
                value={email}
                onChange={setEmail}
                required
            ></TextBox>
            <Password
                nome={'Senha'}
                value={senha}
                onChange={setSenha}
                required
            >
            </Password>
            <div className="Button-Form">
                <Button text={'Enviar'} variant="send" type= {'submit'}  ></Button>
                <Button text={'Cancelar'} variant="cancel" onClick={Cancelar}></Button>

            </div>




        </form>


    )
}


export default Form