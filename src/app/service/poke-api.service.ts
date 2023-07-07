import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IPokemonList } from '../shared/IPokemonList';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private url:string = "https://pokeapi.co/api/v2/pokemon/";
  
  constructor(private http: HttpClient) 
  { }

  public apiListAllPokemons(off: string, limit: string): Observable<any>{
    
    return this.http.get<IPokemonList>(this.url, {params: {offset: off, limit}}).pipe(
      tap(res => res),
      tap(res=> {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe(res => resPokemons.status = res)
        })
      })
    )
  }
  public apiGetPokemons(url: string):Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }
}
