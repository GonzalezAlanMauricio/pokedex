const pokemonInTheWeb = 12;
$(document).ready(function () {



  getMultiplePokemon(1)
    .then(data => pokemonInformation(data))



});
const evoluciones = $.getJSON('https://api.npoint.io/ab2c33f672da1f6e29a2', function (evoluciones) {
  return evoluciones;
})

const previousPokemon = () => {
  const id = parseInt($(".pokemon-id")[0].innerText.substr(5)) - pokemonInTheWeb;
  if (id === '..') {
    alert('Falta cargar la pagina')
  } else if (id - pokemonInTheWeb > 1) {
    $(".card.front img").map(function () { $(this).attr('src', './gif/loading.gif') })
    getMultiplePokemon(id)
      .then(data => pokemonInformation(data))
  } else {
    alert('No hay mas pokemones')
  }
}
const nextPokemon = () => {
  const id = parseInt($(".pokemon-id")[pokemonInTheWeb - 1].innerText.substr(5)) + 1;
  if (id === '..') {
    alert('Falta cargar la pagina')
  } else if (id + pokemonInTheWeb < 157) {
    $(".card.front img").map(function () { $(this).attr('src', './gif/loading.gif') })
    getMultiplePokemon(id)
      .then(data => pokemonInformation(data))
  } else {
    alert('No hay más pokemones')
  }
}

const pokemonInformation = (arrayOfPokemonObj) => {
  startIndex = arrayOfPokemonObj[0].id;
  $(".pokemon-id").map(function (index) {
    index += startIndex;
    this.innerText = `Id: #${index <= 9 ? '0' + index : index}`
  })
  $(".a-more-info").map(function (index) {
    index += startIndex;
    $(this).attr('id', `${index}`)
  })
  const pokemonType = index => arrayOfPokemonObj[index].types[0].type.name;
  $(".card.front img").map(function (index) { $(this).attr('src', `https://pokeres.bastionbot.org/images/pokemon/${startIndex + index}.png`) })
  $(".img-shiny img").map(function (index) { $(this).attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${startIndex + index}.png`) })
  $(".pokemon-name").map(function (index) { this.innerText = arrayOfPokemonObj[index].name })
  $(".pokemon-height").map(function (index) { this.innerText = `Altura: ${arrayOfPokemonObj[index].height}cm` })
  $(".pokemon-weight").map(function (index) { this.innerText = `Peso: ${arrayOfPokemonObj[index].weight * 100}gr` })
  $(".pokemon-type").map(function (index) { this.innerText = `Tipo: ${pokemonType(index)}` })
  $(".card.front").map(function (index) { $(this).removeClass().addClass(pokemonType(index)).addClass('card front') })
  $(".card.back").map(function (index) { $(this).removeClass().addClass(`${pokemonType(index)}-back`).addClass("card back") })
  $(".info-list").map(function (index) { $(this).removeClass().addClass(`info-list-${pokemonType(index)} info-list`) })
}


const getPokemon = (id, name = undefined) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`)
    .then(response => response.json())

}

const getMultiplePokemon = (startIndex) => {
  endIndex = startIndex + pokemonInTheWeb;
  const pokemonpokemonInTheWeb = [...Array(endIndex - startIndex + 1).keys()].map(number => getPokemon(number + startIndex));
  return Promise.all(pokemonpokemonInTheWeb)
    .then(response => response);

}

const showMoreInfo = (event, idOfPokemon = undefined, typeOfPokemon = undefined) => {
  $(".more-info").show()
  $('.pre-evolution').attr('src', `./gif/loading.gif`)
  $('.post-evolution').attr('src', `./gif/loading.gif`)
  $(".description-more-info")[0].innerText = '...'
  $($('.img-more-info')[0]).attr('src', `./gif/loading.gif`)

  let id = idOfPokemon || event.target.id
  const evolucionesOfPokemon = evoluciones.responseJSON[id].evolutions[0]?.id
  let classes = $(event?.target).parent().attr('class');
  type = typeOfPokemon || classes.substr(0, classes.indexOf('-'));
  $('.img-more-info').removeClass().addClass(`img-more-info ${type}`)
  $($('.img-more-info')[0]).attr('src', `https://pokeres.bastionbot.org/images/pokemon/${id}.png`)
  $('.background-more-info').removeClass().addClass(`background-more-info ${type}`)
  //Evolucion
  if (evolucionesOfPokemon) {

    $('.sprites').show()
    $('.sin-evoluciones').hide()
    $('.pre-evolution').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
    $('.post-evolution').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolucionesOfPokemon}.png`)
  } else {

    $('.sprites').hide()
    $('.sin-evoluciones').show()
  }
  fetch(` https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(data => data.json()
      .then(pokemonSpecie => $(".description-more-info")[0].innerText = pokemonSpecie.flavor_text_entries.filter(entry => entry.language.name === "es")[0].flavor_text))
}

const closeShowMoreInfo = () => {
  $(".more-info").hide()
}

const findPokemon = (event) => {
  event.preventDefault()
  const pokemonToFind = $('#findPokemonByIdOrName').val()
  if (pokemonToFind >= 1 && pokemonToFind <= 151) {
    getPokemon(pokemonToFind)
      .then(pokemon => showMoreInfo(undefined, pokemonToFind, pokemon.types[0].type.name))
  } else if (/^[a-z]+$/.test(pokemonToFind.toLowerCase())) {
    getPokemon(null || pokemonToFind)
      .then(pokemon => showMoreInfo(undefined, pokemon.id, pokemon.types[0].type.name))
      .catch(() => alert('Nombre de pokemon incorrecto'))
  } else {
    alert('Id o nombre incorrectos')
  }
}