import { useEffect, useState } from "react";

import './App.css'

function app (){

  const [estados,setEstados] = useState([]);
  const [cidades,setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado]= useState('default');
  const [cidadeSelecionado, setcidadeSelecionado]= useState('default');
  const [cidadeInfo, setCidadeInfo] = useState(null);

  useEffect (()=>{
    async function carregarEstados() {
      const res = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const dados = await res.json()
      setEstados(dados)
    }
    carregarEstados();
  },[])


  useEffect (()=>{
    if(estadoSelecionado === 'default')return
    async function carregarCidades() {
      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      );
      const dados = await res.json();
      setCidades(dados)
      
    }
    carregarCidades()

  },[estadoSelecionado])

  function verMais (){
    if(cidadeSelecionado === 'default') return

    const cidadeItem = cidades.find(
      (c) => c.id == cidadeSelecionado
    );
    setCidadeInfo(cidadeItem)

  }


  return(
    <div className="app-div">

      <h2>
        Escolha sua cidade
      </h2>
      <select 
      value={estadoSelecionado}
      onChange={(e)=>{ 
        setEstadoSelecionado(e.target.value)
        setCidades([])
        setCidadeInfo(null)

      }}
      >
        <option value="default">Escolha seu estado</option>
        {estados.map((estado =>
          <option 
          key={estado.id} 
          value={estado.sigla}>
            {estado.nome}
          </option>
        ))} 

      </select>

      {cidades.length > 0 &&(
        <>
        <h2>
          Escolha a cidade
        </h2>

        <select 
        value={cidadeSelecionado}
        onChange={(e) =>{ 
          setcidadeSelecionado(e.target.value)
          setCidadeInfo(null)
        }}
        
        >

          <option value= 'default'>Escolha a cidade</option>

          {cidades.map((cidade =>
            <option key={cidade.id} value={cidade.id}> {cidade.nome}</option>
          ))}
        </select>



        <button type="button" onClick={verMais}> Ver mais</button>
        
        </>
      )}

      {cidadeInfo && (
        <pre>
          Região: {cidadeInfo.nome}  <br/> 
          Microregião: {cidadeInfo.microrregiao.nome} <br/>
          Mesorregião: {cidadeInfo.microrregiao.mesorregiao.nome}
        </pre>
      )}



    </div>



  )
}

export default app