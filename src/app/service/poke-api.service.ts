import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IPokemonList} from '../shared/IPokemonList';
import { ParamsPage } from '../entities/paramsPage';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private url:string = "https://pokeapi.co/api/v2/pokemon/";
  private dataSource = new BehaviorSubject<ParamsPage>(new ParamsPage());
  
  constructor(private http: HttpClient) 
  { }
  setParams(params: ParamsPage){
    this.dataSource.next(params);
  }
  getParams(): Observable<ParamsPage>{
    return this.dataSource.asObservable();
  }

  public apiListAllPokemons(offSet: string, limit: string): Observable<any>{
    
    return this.http.get<IPokemonList>(this.url, {params: {offset: offSet, limit}}).pipe(
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
