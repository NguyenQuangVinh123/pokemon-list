import Pagination from "../components/Pagination";
import PokemonGrid from "../components/PokemonGrid";
import PokemonType from "../components/PokemonType";
import { PokemonItemType, PokemonTypeDetail } from "../types/pokemon";
import callApi from "../utils/api";
import { limitItemPerPage } from "../utils/const";
import { array2IsSubsetOfArray1 } from "../utils/helpers";

async function PokemonListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const listPokemon = await callApi(
    "pokemon",
    `limit=1200&offset=${searchParams?.offset}`,
    "GET"
  );
  const mappingPokemonList = await Promise.all(
    listPokemon.results.map(async (element: PokemonItemType) => {
      const parts = element.url.split("/");
      const getIDPokemon = parts[parts.length - 2];
      const pokemon : PokemonTypeDetail = await callApi(`pokemon/${getIDPokemon}`);
      const types: string[] = pokemon.types.reduce((acc : string[], cur: any) => {
        acc.push(cur.type.name);
        return acc;
      }, []);
      return {
        name: element.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types,
      };
    })
  );

  const listType = decodeURIComponent(searchParams?.types).split(",");
  const start: number = Math.abs(
    (parseInt(searchParams.page) - 1) * parseInt(searchParams.offset)
  );
  const end = start + limitItemPerPage;
  const pokemonTypes = await callApi(`type`, "", "GET", "no-cache");
  const filteredPokemonList = searchParams?.types
    ? mappingPokemonList.filter((i) =>
        array2IsSubsetOfArray1(i.types, listType)
      )
    : mappingPokemonList;
  return (
    <main>
      <PokemonType
        pokemonTypes={pokemonTypes.results}
        total={filteredPokemonList.length}
      />
      <PokemonGrid
        pokemon={
          searchParams?.types
            ? mappingPokemonList
                .filter((i) => array2IsSubsetOfArray1(i.types, listType))
                .slice(0, limitItemPerPage)
            : mappingPokemonList.slice(0, limitItemPerPage)
        }
      />
      <Pagination
        isHasNextPage={end < parseInt(listPokemon?.results?.length)}
        isHasPrevPage={parseInt(searchParams.page) > 0}
      />
    </main>
  );
}
export default PokemonListPage;
