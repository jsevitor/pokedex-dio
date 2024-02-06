// const idPokemon = document.querySelector('.id-pokemon');
// const details = document.querySelector('.details');


// // Extrair o ID do Pokémon da URL
// const params = new URLSearchParams(window.location.search);
// const pokemonId = params.get('id');

// // Agora você pode usar o pokemonId para carregar os detalhes do Pokémon correspondente




// function convertIdPokemonToHtml(pokemon) {

//     return `
//         <div class="id">
//             <spam class="name">${pokemon.name}</spam>
//             <span class="number">#${pokemon.number}</span>
//         </div>
//         <div class="types">
//             ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
//         </div>
//         <img src="${pokemon.photo}"
//              alt="${pokemon.name}"
//         >
//     `
// }

// function loadPokemonDetails() {
//     pokeApi.getPokemonsDetail().then((pokemons = []) => {
//         const newHtml = pokemons.map(convertIdPokemonToHtml).join('')
//         pokemonList.innerHTML += newHtml
//     })
// }


const idPokemon = document.querySelector('.id-pokemon');
const infoPokemon = document.querySelector('.info-pokemon');
const details = document.querySelector('.details');

const pokemonId = 1;//params.get('id');


pokeApi.getPokemonsDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}` })
    .then((pokemon) => {
    
        idPokemon.innerHTML = convertIdPokemonToHtml(pokemon);
        infoPokemon.innerHTML = convertInfoPokemonToHtml(pokemon);
       
    })
    .catch((error) => {
        console.error("Erro ao obter detalhes do Pokémon:", error);
    });

const convertMeasures = ((value) => {
    return value/10;
});

function convertIdPokemonToHtml(pokemon) {
    return `
        <div class="id">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
        </div>
        <div class="types">
            ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
        </div>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    `;
}

function convertInfoPokemonToHtml(pokemon) {
    return `
        <li class="info">
            <span>Species</span>
            <span>${pokemon.species}</span>
        </li>
        <li class="info">
            <span>Height</span>
            <span>${convertMeasures(pokemon.height)} cm</span>
        </li>
        <li class="info">
            <span>Weight</span>
            <span>${convertMeasures(pokemon.weight)} Kg</span>
        </li>
        <li class="info">
            <span>Abilities</span>
            <span>${pokemon.abilities}</span>
        </li>
    `
}
