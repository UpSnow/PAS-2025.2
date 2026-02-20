const pokemon = "charizard";

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        }
        return response.json()
    })
    .then(data => {
        const nome = data.name;
        const imagemFrontal = data.sprites.front_default;
        const imagemTraseira = data.sprites.back_default;
        const audio = data.cries.latest;
        const altura = data.height;
        const peso = data.weight;

        const tipos = data.types.map(tipo => tipo.type.name).join(", ");

        const resultado = document.getElementById("resultado");

        resultado.innerHTML = `
            <h2>${nome}</h2>
            <p><strong>Altura:</strong> ${altura}</p>
            <p><strong>Peso:</strong> ${peso}</p>
            <p><strong>Tipos:</strong> ${tipos}</p>

            <img src="${imagemFrontal}" alt="Imagem frontal">
            <img src="${imagemTraseira}" alt="Imagem traseira">

            <br><br>

            <audio controls src="${audio}"></audio>
        `;
    })
    .catch(error => {
        console.log(error);
    });



