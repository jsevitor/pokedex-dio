
const idPokemon = document.querySelector('.id-pokemon');
const infoPokemon = document.querySelector('.info-pokemon');
const details = document.querySelector('.details');
const stats = document.querySelector('.stats');
const progress = document.querySelector('.progress-value');

const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('id');


pokeApi.getPokemonsDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}` })
    .then((pokemon) => {

        idPokemon.innerHTML = convertIdPokemonToHtml(pokemon);
        infoPokemon.innerHTML = convertInfoPokemonToHtml(pokemon);
        stats.innerHTML += convertStatsPokemonToHtml(pokemon);
        updateBackgroundColor(pokemon.type);
    })
    .catch((error) => {
        console.error("Erro ao obter detalhes do Pokémon:", error);
    });

const convertMeasures = (element, value) => {
    if (element === 'height') {
        return value * 10;
    } else if (element === 'weight') {
        return value / 10;
    }
};

function convertIdPokemonToHtml(pokemon) {
    return `
        <div class="id">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
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
            <span id="height">${convertMeasures('height', pokemon.height)} cm</span>
        </li>
        <li class="info">
            <span>Weight</span>
            <span id="weight">${convertMeasures('weight', pokemon.weight)} Kg</span>
        </li>
        <li class="info">
            <span>Abilities</span>
            <span>${pokemon.abilities}</span>
        </li>
        <li class="info">
            <span>Gender</span>
            <span>${pokemon.genders}</span>
        </li>
        <li class="info">
            <span>Egg Groups</span>
            <span>${pokemon.eggGroups}</span>
        </li>
    `
}


function convertStatsPokemonToHtml(pokemon) {
    let html = '';
    for (let i = 0; i < pokemon.statsNames.length; i++) {
        let totalStats = + pokemon.statsBase[i];
        html += `
            <li class="stat">
                <span class="stat-name">${pokemon.statsNames[i]}</span>
                <span class="stat-value">${pokemon.statsBase[i]}</span>
                <span class="stat-progress">
                    <div class="progress-value ${pokemon.type}" style="width: ${pokemon.statsBase[i]}%"></div>
                </span>
            </li>
        `;
    }
    return html;
}



function updateBackgroundColor(type) {
    const contentDetail = document.getElementById('content-detail');
    contentDetail.className = 'content';
    contentDetail.classList.add(type.toLowerCase());
}

document.addEventListener('DOMContentLoaded', function() {
    const detailOptions = document.querySelectorAll('.detail-options span'); 
    const contentSections = document.querySelectorAll('.info-pokemon, .stats, .evolution'); 

    contentSections[0].style.display = 'block';
    contentSections[1].style.display = 'none';
    contentSections[2].style.display = 'none';
    detailOptions[0].style.borderBottom = '2px solid #6F7BDB'; 

    detailOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            detailOptions.forEach(opt => opt.style.borderBottom = 'none');
            detailOptions[index].style.borderBottom = '2px solid #6F7BDB';

            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            contentSections[index].style.display = 'block';
        });
    });
});

