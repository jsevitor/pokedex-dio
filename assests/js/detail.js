
const idPokemon = document.querySelector('.id-pokemon');
const infoPokemon = document.querySelector('.info-pokemon');
const moreInfoPokemon = document.querySelector('#moreInfo');
const details = document.querySelector('.details');

// const pokemonId = 5;//params.get('id');

const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('id');


pokeApi.getPokemonsDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}` })
    .then((pokemon) => {
    
        idPokemon.innerHTML = convertIdPokemonToHtml(pokemon);
        infoPokemon.innerHTML = convertInfoPokemonToHtml(pokemon);
        moreInfoPokemon.innerHTML = convertBreedPokemonToHtml(pokemon);
        updateBackgroundColor(pokemon.type);
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

function convertBreedPokemonToHtml(pokemon) {
    return `
        <li class="info">
            <span>Gender</span>
            <span>${pokemon.genders}</span>
        </li>
        <li class="info">
            <span>Egg Groups</span>
            <span>${pokemon.eggGroups}</span>
        </li>
        <li class="info">
            <span>Egg Cycles</span>
            <span>${pokemon.eggCycles}</span>
        </li>
    `
}

function updateBackgroundColor(type) {
    const contentDetail = document.getElementById('content-detail');
    contentDetail.className = 'content';
    contentDetail.classList.add(type.toLowerCase());
}

