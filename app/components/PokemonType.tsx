"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PokemonItemType } from "../types/pokemon";
export type PokemonTypeProps = {
  pokemonTypes: PokemonItemType[];
  total: number;
};
const PokemonType = (props: PokemonTypeProps) => {
  const { pokemonTypes, total } = props;
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const togglePokemonType = (item: string) => {
    const newList = activeTypes.includes(item)
      ? activeTypes.filter((listItem) => listItem !== item)
      : [...activeTypes, item];
    setActiveTypes(newList);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeTypes && activeTypes.length > 0) {
      params.set("types", `${encodeURIComponent(activeTypes.join(","))}`);
    } else {
      params.set("types", "");
    }
    params.set("offset", "0");
    params.set("page", "0");

    if (router) {
      router.replace(`${pathName}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTypes]);
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex items-center mx-4 my-4">
        <div className="mr-2 my-4 font-bold self-start">Types:</div>
        <div>
          {pokemonTypes.map((i) => (
            <button
              key={i.url}
              onClick={() => togglePokemonType(i.name)}
              className={`px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold ${
                activeTypes.includes(i.name)
                  ? "text-white bg-red-900"
                  : "text-red-900"
              } `}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
      <div className="my-12 mx-4 font-bold">{total} results found</div>
    </div>
  );
};
export default PokemonType;
