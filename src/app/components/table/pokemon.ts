export interface Pokemons{
    results: Pokemon[];
    count: number;
}
export interface Pokemon {
    id: number;
    name: string;
    abilitie: [string];
    type: [string];
    weight: number;
    height: number;
}
