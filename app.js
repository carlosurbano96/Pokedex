const baseURL = `https://pokeapi.co/api/v2/pokemon/`
const pokemon = document.getElementById(`pokeName`)
const buttonSearch = document.getElementById(`searchPokemon`)
const appNode = document.getElementById(`app`)
const removePokemon = document.getElementById(`borrarPokemon`)

buttonSearch.addEventListener(`click`, insertarPokemon)
removePokemon.addEventListener(`click`, borrarPokemon)

function insertarPokemon (){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then(response => {
        if(response.status == 404){
            alert(`Este pokemon no está disponible. Revise nuevamente`)
        }else{
            return response.json()
        }
    })
    .then(responseJSON => {
        const allItems = []
        const result = []

        for(let pokemonInfo in responseJSON){
            result.push([pokemonInfo, responseJSON[pokemonInfo]])
        }

        console.table(result)

        const pokeImagen = document.createElement(`img`)
        pokeImagen.src = result[14][1].front_default

        const pokemonName = document.createElement(`h2`)
        pokemonName.innerText = `Name: ${result[10][1]} | ID: ${result[6][1]}`

        const pokemonTipo = document.createElement(`h3`)
        pokemonTipo.innerText = `Tipo: ${result[16][1][0].type.name}`

        const contenedor = document.createElement(`section`)
        contenedor.append(pokeImagen, pokemonName, pokemonTipo)

        allItems.push(contenedor)
        appNode.append(...allItems)
    })
}

function borrarPokemon(){
    let allPokemons = appNode.childNodes
    allPokemons = Array.from(allPokemons)
    
    allPokemons.forEach(pokemon => {
        pokemon.remove(pokemon)
    })


}