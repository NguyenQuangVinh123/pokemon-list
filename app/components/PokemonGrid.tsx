import { PokemonItemType } from "../types/pokemon";
import PokemonItem from "./PokemonItem";
type PokemonGridProps = {
  pokemon: PokemonItemType[];
};

const PokemonGrid = (props: PokemonGridProps) => {
  const { pokemon } = props;

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {pokemon &&
        pokemon.map((item) => <PokemonItem key={item.name} item={item} />)}
    </div>
  );
};
export default PokemonGrid;
