import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function PokemonListLayout(props: Props) {
  return (
    <>
      {props?.children}
    </>
  );
}