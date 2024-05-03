

export type PokemonItemType = {
    name: string
    url: string
    image: string
}


export type PokemonTypeDetail = {
    types: Type[]
    sprites: Sprites

}
export type Sprites = {
    other: {
        ["official-artwork"]: {
            front_default: string
        }
    }
}

export interface Type {

    type: {
        name: string
        url: string
    }
}