
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Pokemons, Pokemon } from '../components/table/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {
    console.log('Pokemon service listo');
  }

  getQuery(query: string) {
    const url = `https://pokeapi.co/api/v2/${query}`;
    return this.httpClient.get(url);
  }

  getPokemons() {
    return this.getQuery(`pokemon/?offset=${0}&limit=${964}`)
    .pipe(
      map((data: any) => {
        return data.results;
      })
    );
  }

  getInfoPokemon(name: string) {
    return this.getQuery(`pokemon/${name}`);
  }
}
