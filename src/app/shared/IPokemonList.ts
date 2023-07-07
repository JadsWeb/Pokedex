export interface IPokemonList {
    count: number;
    next: string;
    previous: string;
    results: Array<object>;
}
export interface IParamsLimit {
    off: string;
    limit: string;
}