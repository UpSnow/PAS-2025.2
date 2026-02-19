
// Objeto para guardar estados da aplicação (tipo uma "memória")
const state = {
    cityRootContainerEnabled: false // controla se o container de cidades está ativo ou não
}

const STATE_API = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'


const CITIES_API = uf =>
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`

// Quando a página terminar de carregar completamente,
// executa a função loadState
window.addEventListener('load', loadState)

// Pega o elemento select dos estados
document.getElementById('select-states')
    // Quando o usuário mudar o valor do select,
    // executa a função selectState
    .addEventListener('change', selectState)

// Função assíncrona que será executada para carregar os estados
async function loadState() {
    // Faz uma requisição HTTP para a API do IBGE
    const response = await fetch(STATE_API)
    // Converte a resposta da API para JSON (objeto JavaScript)
    const states = await response.json()

    // Seleciona o elemento <select> do HTML pelo id
    const selectStates = document.getElementById('select-states')


    // Ordena os estados em ordem alfabética pelo nome
    states
        .sort((a, b) => a.nome.localeCompare(b.nome))
    // Percorre todos os estados da lista
    states.forEach(stateItem => {
        // Cria uma nova tag <option> no JavaScript
        const option = document.createElement('option')
        // Define o valor interno da opção (usado no código)
        option.value = stateItem.sigla
        // Define o texto visível para o usuário
        option.textContent = stateItem.nome
        // Adiciona a opção dentro do select
        selectStates.append(option)

    });

    selectStates.addEventListener('change', cleanInfo)

     

}

// Função chamada quando o usuário seleciona um estado no <select>
async function selectState() {

    // Pega o valor da opção selecionada no select de estados
    // Ex: "PB", "SP", "RJ" ou "default"
    const uf = document.getElementById("select-states").value


    // Verifica se o usuário escolheu um estado válido
    // !== significa "diferente de"
    // Se uf NÃO for "default", vira true
    // Se ainda estiver no "Selecione...", vira false
    state.cityRootContainerEnabled = uf !== 'default'


    // Operador ternário (um IF resumido)
    // condição ? se for true : se for false

    // Se cityRootContainerEnabled for true
    // → cria a área das cidades daquele estado
    // Se for false
    // → remove a área das cidades da tela
    state.cityRootContainerEnabled
        ? buildCityRootContainer(uf)
        : destroyCityRootContainer()

}


// Função responsável por DESTRUIR (remover) a parte de cidades da tela
// Ela é chamada quando o estado volta para "default"
// ou quando precisa limpar a interface
async function destroyCityRootContainer() {

    // Procura se existe um botão com id "seeMore" (botão Ver mais)
    // Isso é uma verificação de segurança
    // porque talvez o botão ainda não tenha sido criado
    if (document.getElementById('seeMore')) {

        // Se o botão existir:
        document
            .getElementById('seeMore')

            // Remove o evento de clique associado ao botão
            // Ou seja, o botão deixa de executar a função viewcityData
            // Isso evita duplicação de eventos e bugs
            .removeEventListener('click', viewcityData)
    }


    // Procura o container principal das cidades (select + botão + info)
    // ?. significa: se existir, remova
    // remove() apaga o elemento completamente do DOM (da página)
    document.getElementById('cityRootContainer')?.remove()

}


// Função responsável por CONSTRUIR (criar) a área das cidades
// Ela recebe a sigla do estado (uf) selecionado
async function buildCityRootContainer(uf) {

    // Verifica se já NÃO existe um container com id "cityRootContainer"
    // O ! significa "não"
    // Ou seja: só cria se ainda não existir (evita duplicação)
    if (!document.getElementById('cityRootContainer')) {

        // Cria o container principal das cidades
        // Essa função cria uma <div> com o título "Escolha a cidade desejada"
        // e retorna esse elemento
        const root = buildRootContainer();

        // Cria o select onde as cidades serão listadas
        // "root" é onde o select será colocado (dentro do container)
        // "selectCities" será o id do select
        buildCityList(root, 'selectCities');

        // Cria o botão "Ver mais" dentro do container
        // Esse botão vai mostrar as informações da cidade
        buildInfoButton(root);
    }

    // Depois de garantir que o container existe,
    // carrega as cidades do estado selecionado (uf)
    // e preenche o select de cidades
    populateCityList(uf, 'selectCities')
}


//----------------------------------------------------------------------------
// Função responsável por criar a área onde ficará a seleção de cidades
function buildRootContainer() {

    // Cria uma nova <div> dinamicamente (ela ainda não aparece na tela)
    const container = document.createElement('div')

    // Define um id para essa div para poder identificá-la depois
    container.id = 'cityRootContainer'


    // Cria um elemento <h2> (título)
    const title = document.createElement('h2')

    // Define o texto que aparecerá nesse título
    title.textContent = 'Escolha a cidade desejada'


    // Coloca o <h2> dentro da <div>
    // Agora o título virou "filho" da div
    container.append(title)


    // Adiciona a <div> dentro do <body> da página
    // Só aqui ela passa a aparecer na tela
    document.body.append(container)


    // Retorna a div criada para que outras funções possam usar ela depois
    return container
}

// Função responsável por criar a lista (select) onde as cidades aparecerão
// container → é a div onde o select será colocado
// id → é o id que será atribuído ao select criado
function buildCityList(container, id) {

    // Cria um elemento <select> dinamicamente usando JavaScript
    // Não precisa usar <> porque você está criando um elemento, não escrevendo HTML
    const select = document.createElement('select')


    // Define o id do select para poder acessá-lo depois no código
    // Exemplo: <select id="selectCities"></select>
    select.id = id

    select.addEventListener('change', cleanInfo)


    // Adiciona o select dentro do container (div de cidades)
    // Agora ele passa a fazer parte da página
    container.append(select)

}
function buildInfoButton(container) {
    // Cria um elemento <button> dinamicamente via JavaScript
    // Não precisa usar <> porque estamos criando pelo DOM, não escrevendo HTML
    const button = document.createElement('button')

    // Define um id para o botão (pode ser usado no CSS ou JS depois)
    button.id = 'seeMore'

    // Define o texto que aparece dentro do botão
    button.textContent = 'Ver mais'

    // Adiciona o botão dentro do container recebido por parâmetro
    // Exemplo: uma div, section, etc.
    container.append(button)

    // Adiciona um "ouvinte de evento" de clique ao botão
    // Quando o botão for clicado, a função viewcityData será executada
    button.addEventListener('click', viewcityData)

    

    /*
    EXPLICAÇÃO IMPORTANTE:

    addEventListener('click', viewcityData)

    → 'click' = tipo do evento (quando clicar)
    → viewcityData = função que será chamada quando o evento acontecer

    ⚠️ Você NÃO coloca parênteses aqui:
    ERRADO: viewcityData()
    CERTO: viewcityData

    Se colocar (), a função executa imediatamente ao criar o botão,
    e não quando clicar.

    -----------------------------------------------------

    SOBRE O BUG DO SEGUNDO SELECT:

    Se "quando não tem viewcity buga", pode ser porque:

    1️⃣ A função viewcityData não existe ou não foi carregada ainda
       → gera erro e para o JavaScript

    2️⃣ Dentro de viewcityData você pode estar manipulando o segundo select

    3️⃣ Pode estar acontecendo erro e o resto do código não executa

    Dica: abre o console do navegador (F12) e vê se aparece erro.
    */
}

function cleanInfo(){
    const info = document.getElementById('cityInfo')
    info.textContent= ''
}

//----------------------------------------------------------------------------

// Função assíncrona que carrega as cidades de um estado (UF)
// uf = sigla do estado (ex: "AM", "SP")
// listId = id do <select> onde as cidades serão inseridas
async function populateCityList(uf, listId) {

    // Procura no HTML o <select> das cidades pelo ID recebido
    const select = document.getElementById(listId)

    // Limpa todas as opções anteriores do select
    // Evita duplicação quando o usuário troca de estado
    select.innerHTML = ''

    // Cria uma option padrão informando que está carregando
    const defaultOption = document.createElement('option')
    defaultOption.value = 'default' // valor padrão (nenhuma cidade escolhida)
    defaultOption.textContent = 'Carregando cidades...'

    // Adiciona essa option ao select
    select.append(defaultOption)


    // Faz requisição à API do IBGE para buscar as cidades do estado escolhido
    const response = await fetch(CITIES_API(uf))

    // Converte a resposta da API para JSON (array de cidades)
    const cities = await response.json()


    // Para cada cidade recebida da API
    cities.forEach(city => {

        // Cria uma nova <option>
        const option = document.createElement('option')

        // Guarda o objeto inteiro da cidade em formato de texto (JSON)
        // Isso permite recuperar todas as informações depois
        option.value = JSON.stringify(city)

        // Texto visível para o usuário (nome da cidade)
        option.textContent = city.nome

        // Adiciona a option ao select
        select.append(option)
    })

    // Depois que terminou de carregar, muda o texto da option padrão
    defaultOption.innerText = 'Escolha uma cidade'

}


function viewcityData() {

    // Pega o valor selecionado no select de cidades
    // (esse valor é o JSON da cidade ou "default")
    const cityRaw = document.getElementById('selectCities').value


    // Se o usuário ainda não escolheu uma cidade válida
    // (ou seja, está na opção "Escolha uma cidade")
    // então a função para aqui e não faz nada
    if (cityRaw === 'default') return


    // Converte o texto JSON em um objeto JavaScript novamente
    // Porque antes salvamos a cidade assim:
    // option.value = JSON.stringify(city)
    const city = JSON.parse(cityRaw)


    // Tenta encontrar no HTML um elemento com id "cityInfo"
    // (onde as informações da cidade serão exibidas)
    var info = document.getElementById('cityInfo')


    // Se esse elemento ainda NÃO existe no DOM
    // (!info significa "se info for null")
    if (!info) {

        // Cria um novo elemento <pre>
        // <pre> mantém espaços e quebras de linha
        info = document.createElement('pre')

        // Define o id para poder encontrar depois
        info.id = 'cityInfo'
    }


    // Define o texto dentro do elemento
    // usando template string (crase ` `)
    info.innerHTML = `
            <strong>Cidade:</strong> ${city.nome}
            <strong>Microrregião:</strong> ${city.microrregiao.nome}
            <strong>Mesorregião:</strong> ${city.microrregiao.mesorregiao.nome}
            <strong>Região :</strong> ${city.microrregiao.mesorregiao.UF.regiao.nome}
        `


    // Adiciona o elemento de informações dentro do container principal
    document.getElementById('cityRootContainer').append(info)
    

    // Mostra o objeto da cidade no console (para debug)
    console.log(city)   
}








