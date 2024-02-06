const idPokemon = document.querySelector('.id-pokemon');
const details = document.querySelector('.details');

function convertIdPokemonToHtml(pokemon) {

    return `
        <div class="id">
            <spam class="name">${pokemon.name}</spam>
            <span class="number">#${pokemon.number}</span>
        </div>
        <div class="types">
            ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
        </div>
        <img src="${pokemon.photo}"
             alt="${pokemon.name}"
        >
    `
}

function loadPokemonDetails() {
    pokeApi.getPokemonsDetail().then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}