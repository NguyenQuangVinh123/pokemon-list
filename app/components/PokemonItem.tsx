import React from "react";
import { PokemonItemType } from "../types/pokemon";
import Image from "next/image";
type PokemonItemProps = {
  item: PokemonItemType;
};
const PokemonItem = (props: PokemonItemProps) => {
  const { item } = props;
  return (
    <div>
      <div className="h-24 w-24 mx-auto">
        <Image src={item.image} alt={item.name} height={96} width={96} />
      </div>
      <div className="text-center">{item.name}</div>
    </div>
  );
};
export default PokemonItem;
