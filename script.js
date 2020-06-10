/*
to do:

cambiar el back
agregar funcionalidad para cambiar los 12 mostrados
agregar more-info
agregar funcionalidad de buscar por id (errores)
agregar funcionalidad de buscar por nombre (errores)
orevisar type types son los mismos
recorrer los 150 pokemon
arreglar el coso ese que agrega px al back
 */
$(document).ready(function () {



  getMultiplePokemon(131, 145)
    .then(data => pokemonInformation(data, 131))



});

const pokemonInformation = (arrayOfPokemonObj, startIndex) => {
  $(".pokemon-id").map(function (index) {
    index += startIndex;
    this.innerText = `Id: #${index <= 9 ? '0' + index : index}`
  })
  $(".card img").map(function (index) { $(this).attr('src', `https://pokeres.bastionbot.org/images/pokemon/${startIndex + index}.png`) })
  $(".pokemon-name").map(function (index) { this.innerText = arrayOfPokemonObj[index].name })
  $(".pokemon-type").map(function (index) { this.innerText = `Tipo: ${arrayOfPokemonObj[index].types[0].type.name}`})
  $(".card.front").map(function (index) { $(this).addClass(arrayOfPokemonObj[index].types[0].type.name).removeClass("missing") })
  $(".card.back").map(function (index) { $(this).addClass(`${arrayOfPokemonObj[index].types[0].type.name}-back`).removeClass("missing-back") })
  $(".info-list-missing").map(function (index) { $(this).addClass(`info-list-${arrayOfPokemonObj[index].types[0].type.name}`).removeClass(".info-list-missing") })
}


const getPokemon = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())

}

const getMultiplePokemon = (startIndex, endIndex) => {
  const pokemon12 = [...Array(endIndex - startIndex + 1).keys()].map(number => getPokemon(number + startIndex));
  return Promise.all(pokemon12)
    .then(response => response);

}

const showMoreInfo = () => {
  alert("hola");
}
  //cargar las primeras imagenes