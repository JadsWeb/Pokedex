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

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  
  constructor(
    private activeRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private router: Router
  ) {  
    pokeApiService.getParams().subscribe(params => {
      this._params.limit = params.limit,
      this._params.off = params.off
    });
  }
  
  
  public backPage(){
    window.history.back();
  }
}
