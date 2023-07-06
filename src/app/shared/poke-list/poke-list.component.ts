import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError: boolean = false;
  private limit: string = this.activeRoute.snapshot.queryParams['limit'];
  private offset: string = this.activeRoute.snapshot.queryParams['offset'];

  constructor (
    private pokeApiService: PokeApiService,
    private activeRoute: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons(this.offset, this.limit).subscribe({
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
