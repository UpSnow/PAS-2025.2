window.addEventListener('load',carregarEstados)
document.getElementById("estados")
    .addEventListener("change", carregarCidades)



// Função responsável por buscar os estados na API do IBGE
// e colocar dentro do <select id="estados">
function carregarEstados(){

    // Faz uma requisição HTTP para a API dos estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

    // Converte a resposta da API para JSON (objeto JavaScript)
    .then(res => res.json())

    // Aqui apenas mostra os dados no console (para debug)
    // e retorna os dados para o próximo then
    .then(dados => {
        console.log(dados)
        return dados
    })

    // Recebe a lista de estados já em formato de array
    .then(estados =>{

        // Seleciona o elemento <select id="estados"> do HTML
        const selectEstados = document.getElementById('estados')

        // Define o conteúdo inicial do select
        // innerHTML substitui todo o conteúdo interno do elemento
        // Aqui estamos colocando uma opção padrão
        selectEstados.innerHTML = "<option>Escolha um estado</option>"

        // Percorre todos os estados recebidos da API
        estados.forEach(estados => {

            // Cria dinamicamente um elemento <option>
            const option = document.createElement("option");

            // Define o valor interno da opção
            // Esse valor será usado no código quando o usuário selecionar
            option.value = estados.sigla;

            // Define o texto visível para o usuário
            // Exemplo: "Paraíba", "São Paulo"
            option.textContent = estados.nome

            // Adiciona a option dentro do select de estados
            selectEstados.appendChild(option)
        });

    });
}


// Função executada quando o usuário seleciona um estado
function carregarCidades(){

    // Pega a sigla do estado selecionado no <select id="estados">
    // Ex: "PB", "SP", "RJ"
    const uf = document.getElementById("estados").value


    // Faz uma requisição para a API do IBGE buscando as cidades do estado escolhido
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

    // Converte a resposta da API para JSON
    .then(res =>res.json())

    // Apenas mostra os dados no console e repassa para o próximo .then
    .then(dados => {
        console.log(dados)
        return dados
    
    })

    // Recebe o array de cidades
    .then(cidades => {

        // Pega a div onde será criada a interface das cidades
        const container = document.getElementById("cidade-container")


        // Cria dinamicamente o conteúdo HTML dentro da div
        // innerHTML interpreta HTML e cria elementos reais
        container.innerHTML = ` 
        <h2>Escolha a cidade Desejada</h2>
        <select id= "cidades"></select>
        <button id= "verMais">Ver mais</button>
        <div id="infoCidade"></div>
        `;
        

        // Seleciona o <select> recém criado
        const selectCidades = document.getElementById("cidades")


        // Percorre todas as cidades recebidas da API
        cidades.forEach(cidade =>{

            // Cria uma nova <option> para cada cidade
            const option = document.createElement("option")

            // Valor interno da option (não visível)
            option.value = cidade.id

            // Texto visível ao usuário (nome da cidade)
            option.textContent = cidade.nome


            // Guarda informações extras no elemento usando dataset
            // Isso cria atributos data-* no HTML
            option.dataset.micro = cidade.microrregiao.nome;
            option.dataset.meso = cidade.microrregiao.mesorregiao.nome;
            option.dataset.regiao = cidade.microrregiao.mesorregiao.UF.regiao.nome;


            // Adiciona a option dentro do select
            selectCidades.appendChild(option);
        });


        // Adiciona um evento de clique ao botão "Ver mais"
        // Quando clicar, executa a função mostrarInfoCidade
        document
                .getElementById("verMais")
                .addEventListener("click", mostrarInfoCidade);


    });
}


function mostrarInfoCidade() {

    // Pega o elemento <select> que contém a lista de cidades
    const select = document.getElementById("cidades");

    // Pega a opção (cidade) atualmente selecionada pelo usuário
    // select.options = lista de todas as options
    // select.selectedIndex = índice da opção escolhida
    const option = select.options[select.selectedIndex];

    // Pega a div onde as informações da cidade serão exibidas
    const info = document.getElementById("infoCidade");

    // Insere conteúdo HTML dentro da div com as informações da cidade
    // innerHTML permite usar tags HTML (<p>, <strong>, etc.)
    info.innerHTML = `
        <p><strong>Microrregião:</strong> ${option.dataset.micro}</p>
        <p><strong>Mesorregião:</strong> ${option.dataset.meso}</p>
        <p><strong>Região:</strong> ${option.dataset.regiao}</p>
    `;
}


