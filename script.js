/*
to do:
              cambiar nombre, tipo por ...
cambiar water por missing
              crear poisson, grass, etc
              crear back-poisson, back-grass, etc
 */
$(document).ready(function () {

  $(".pokemon-id").map(function (index) {
    index += 1;
    this.innerText = `Id: #${index <= 9 ? '0' + index : index}`
  })


  getMultiplePokemon (1,12)
    .then(data => console.log(`Data: `, data))

  $(".card img").map(function (index) { $(this).attr('src', `https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`) })

  
});

const PokemonInformation = (arrayOfPokemonObj, startIndex) => {
}


const getPokemon =  (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(response => response.json())

}

const getMultiplePokemon = (startIndex,endIndex) => {
  const pokemon12 = [...Array(endIndex-startIndex+1).keys()].map(number => getPokemon(number+startIndex));
  return Promise.all(pokemon12)
  .then(response => response);

}

const showMoreInfo = () => {
  alert("hola");
}
  //cargar las primeras imagenes