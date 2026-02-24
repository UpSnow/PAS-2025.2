// Primeira parte da tarefa

// 
const a = fetch("https://swapi.dev/api/planets/?page=2")
.then((response) => response.json())
.then((data) => data.results)
.then (filter =>filter.filter(e => e.climate.includes('frozen')))
.then (map => map.map(element => element.climate.includes('temperate')) )
.then(reduce => reduce.reduce((acumulador, element)=> element.climate.includes('temperate') ? acumulador + 1 : acumulador, 0 ))
.then (cons => console.log(cons))
.catch((e) => console.log(e))





const p = fetch("https://swapi.dev/api/planets/?page=2")
.then((response )=> response.json())
.then(data => data.results)
.then(dataFilter => {
    const planetasCongelados = dataFilter.filter(planeta => 
        planeta.climate.includes('frozen'))

    console.log(planetasCongelados)
})
.then((dataMap)=>{
    const planetasTemperate = dataMap.map(planeta => planeta.climate.includes('temperate'))
    console.log(planetasTemperate)
})
.then((dataReduce) => {
    const reduce = dataReduce.reduce((acumulador, element) => {
        if(element.climate.includes('temperate')){
            return acumulador +1
        }
        return acumulador
        
    }, 0)

    console.log(reduce)
})
.catch(e => console.log(e))

//Finalizado a primeira parte da tarefa


//Segunda parte da tarefa

async function callAsyncdasdasd() {

    const res = await fetch("https://swapi.dev/api/people/?page=1 ")
    const data = await res.json();
    console.log('-----Personagens-----')
    console.log (data.results);
    console.log('-----------------------')

    const result = data.results;
    const filter =  result.filter(element => element.skin_color.includes("green"))
    console.log('-----Personagens que tem a cor de pele verde-----')
    console.log(filter)
    console.log('-----------------------')

    console.log('-----personagem que tem sua massa maior que 100-----')
    console.log('-----Usando Find-----')
    const mass = result.find(element => element.mass >= 100)
    console.log(mass)
    console.log('-----------------------')
    console.log('-----Usando Filter-----')
    const mass1 = result.filter(element => element.mass >= 100)
    console.log(mass1)
    console.log('-----------------------')

    console.log('-----personagens que tem altura maior ou igual a 177-----')
    console.log('----- Usando Operador condicional (ternário) -----')
    const height = result.reduce((acumulador, element)=> element.height >= 177 ? acumulador + 1 : acumulador , 0)
    console.log(height)
    console.log('-----------------------')
    console.log('----- Usando Operador condicional -----')
    const height1 = result.reduce((acumulador, element)=> {
        if(element.height >= 177){
            let result = acumulador +1
            return result
        }
        return acumulador
    }, 0)
    console.log(height1)
    console.log('-----------------------')

    console.log('----- Array com o nome de todos os personagens.-----')
    const namecharacter = result.map(element => element.name)
    console.log(namecharacter)
}

callAsyncdasdasd()

//Finalizado a segunda parte da tarefa