const pokeApi = {}

function convertPokemonDetailToPokemon(pokeDetail, speciesName, eggGroups, eggCycles, genders) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.species = speciesName; 
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((abilityObj) => abilityObj.ability.name).join(', ');

    pokemon.genders = genders;
    pokemon.eggGroups = eggGroups; 
    pokemon.eggCycles = eggCycles; 

    return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonDetail) => {
            const speciesPromise = pokeApi.getPokemonSpecies(pokemonDetail.id);
            const eggGroupsPromise = pokeApi.getPokemonEggGroups(pokemonDetail.species.url);
            const eggCyclesPromise = pokeApi.getPokemonEggCycles(pokemonDetail.species.url);
            const genderPromise = pokeApi.getPokemonGenders(pokemonDetail.species.url);

            return Promise.all([speciesPromise, eggGroupsPromise, eggCyclesPromise, genderPromise])
                .then(([speciesData, eggGroupsData, eggCyclesData, genderData]) => {
                    const speciesName = speciesData.genera[7].genus.split(' ')[0];
                    const eggGroups = eggGroupsData.egg_groups.map(group => group.name).join(', ');
                    const eggCycles = eggCyclesData.hatch_counter;
                    const genders = (genderData.gender_rate === -1 ? ['Genderless'] : ['Male', 'Female']).join(', ');
                    return convertPokemonDetailToPokemon(pokemonDetail, speciesName, eggGroups, eggCycles, genders);
                });
        });
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonSpecies = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
    
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter os dados da espécie do Pokémon:', error);
        });
}

pokeApi.getPokemonEggGroups = (speciesUrl) => {
    return fetch(speciesUrl)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter os grupos de ovos do Pokémon:', error);
        });
}

pokeApi.getPokemonEggCycles = (speciesUrl) => {
    return fetch(speciesUrl)
        .then(response => response.json())
        .then(data => data.hatch_counter)
        .catch(error => {
            console.error('Erro ao obter o ciclo de ovos do Pokémon:', error);
        });
}

pokeApi.getPokemonGenders = (speciesUrl) => {
    return fetch(speciesUrl)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter os gêneros do Pokémon:', error);
        });
}

pokeApi.getPokemons().then((pokemons) => {
    console.log(pokemons);
});
