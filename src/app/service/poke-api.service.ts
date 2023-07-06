import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private _off: string = ''; 
  private _limit: string = '';
  private url:string = "";
  
  constructor(private http: HttpClient) 
  { }
  public apiListAllPokemons(off: string, limit: string): Observable<any>{
    if (this._off !== off && this._limit !== limit){
      this._off = off;
      this._limit = limit;
    }
    this.url = `https://pokeapi.co/api/v2/pokemon/?offset=${this._off}&limit=${this._limit}`;
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res=> {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe({
            next: res => resPokemons.status = res
          })
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
