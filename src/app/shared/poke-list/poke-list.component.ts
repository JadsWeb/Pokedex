import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { ActivatedRoute } from '@angular/router';
import { IParamsLimit } from '../IPokemonList';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit, IParamsLimit {
  private setAllPokemons: any;
  
  limit = this.activeRoute.snapshot.queryParams['limit'];
  off = this.activeRoute.snapshot.queryParams['offset'];

  public getAllPokemons: any;
  public apiError: boolean = false;

  constructor (
    private pokeApiService: PokeApiService,
    private activeRoute: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons(this.off, this.limit).subscribe({
      next: res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      error: error => {
        this.apiError = true;
      }
    });
  }
  public getSearch(value: string){
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLocaleLowerCase());
    });
    this.getAllPokemons = filter;
  }
}
