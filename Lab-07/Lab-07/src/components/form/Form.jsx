import React, { useState } from "react";
import './Form.css'


import TextBox from '../textBox/TextBox'
import Password from '../Password/Password'
import Button from '../Button/Button.jsx'



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
            <h1>Formulario com React</h1>
            <TextBox
                nome={'Nome'}
                value={nome}
                onChange={setNome}
                required

            ></TextBox>
            <TextBox
                nome={'Sobrenome'}
                value={sobrenome}
                onChange={setSobrenome}
                required
            ></TextBox>
            <TextBox
                nome={'E-mail'}
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