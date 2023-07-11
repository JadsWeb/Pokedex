import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ParamsPage } from 'src/app/entities/paramsPage';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  private _params = new ParamsPage();
  private router = new Router;

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  
  constructor(
    private activeRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
  ) {  
    pokeApiService.getParams().subscribe(params => {
      this._params.limit = params.limit,
      this._params.off = params.off
    });
  }
  ngOnInit(): void {
    this.getPokemon();
  }
  
  public getPokemon(){
    const id = this.activeRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);
    return forkJoin([pokemon, name]).subscribe({
      next: res => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error: error => {
        this.apiError = true;
      }
    });
  }
  public backPage(){
    if(this._params.limit != undefined)
      this.router.navigate([`?offset=${this._params.off}&limit=${this._params.limit}`]);
    if(this._params.limit === undefined)  
      this.router.navigate(['']);
  }
}
