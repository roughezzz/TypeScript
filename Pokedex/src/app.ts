const container: HTMLElement | any = document.getElementById("app");
const pokemon: number = 100;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {
  for (let i = 1; i <= pokemon; i++) {
    getPokemon(i);
  }
};

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  const transformedPokemon: IPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  showPokemon(transformedPokemon);
};

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
        <div class="card col-3">
          <span class="card--id">#${pokemon.id}</span>
          <img src="${pokemon.image}" alt="${pokemon.name}" class="card--image"/>
          <h3 class="card--name">${pokemon.name}</h3>
          <span class="card--details">${pokemon.type}</span>
        </div>
    `;
  container.innerHTML += output;
};
fetchData();
