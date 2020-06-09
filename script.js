$( document ).ready(function() {
  
  const showMoreInfo = () => {
    alert("hola");
  }
  //cargar las primeras imagenes
  $(".pokemon-id").map(function (index) {
    this.innerText = `Id: #${index<=9?'0'+index:index}`
  })
  $(".card img").map(function(index){$(this).attr('src',`https://pokeres.bastionbot.org/images/pokemon/${index+1}.png`)})

});