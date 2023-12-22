const URL_BASE = "https://pokeapi.co/api/v2/"
const endpoint_todos = "pokemon/"
const customPokedex = [];

const listaPokemones = JSON.parse(localStorage.getItem("pokemones")) || [];
const button = document.querySelector("#getPokemons")

function seleccionarPokemones() {
    console.log("holas")
    document.querySelectorAll(".un-pokemon").forEach((card) => {
        card.addEventListener("click", () => {
            console.log("Clic en un-pokemon");
            card.classList.toggle("seleccionado");
        });
    });
}

const mostrarPokemones = (pokemones) =>{
    const contenedor = document.querySelector("#pokemon-container");
    pokemones.forEach((pokemon) =>{
        const card = document.createElement("div")
        const parrafo = document.createElement("p")
        card.classList.add("un-pokemon");
        fetch(URL_BASE + endpoint_todos + pokemon.name)
            .then((res) =>{
                return res.json()
            })
            .then((data) =>{
                const img = document.createElement("img")
                img.src = data.sprites.front_default
                parrafo.innerText = pokemon.name
                card.appendChild(img)
                card.appendChild(parrafo)
                contenedor.appendChild(card)
            })
    })
    seleccionarPokemones();
    console.log("Elementos .un-pokemon creados:", document.querySelectorAll(".un-pokemon"));
}

const nextButton = () => {
    const containerButton = document.querySelector("#containerButton")
    const button = document.createElement("button")
    console.log(button)
    button.innerText = 'Siguiente'
    containerButton.appendChild(button)
}

const traerPokemones = async () =>{
    const pokemones = await fetch(URL_BASE + endpoint_todos)
    const data = await pokemones.json()
    console.log(data)
    if(data.next){
        nextButton()
    }
    mostrarPokemones(data.results)
}

traerPokemones();

