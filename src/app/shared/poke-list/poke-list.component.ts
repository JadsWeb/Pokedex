import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { ActivatedRoute } from '@angular/router';
import { ParamsPage } from 'src/app/entities/paramsPage';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  private paramsPage: ParamsPage = ({
    limit: this.activeRoute.snapshot.queryParams['limit'],
    off: this.activeRoute.snapshot.queryParams['offset']
  });

  public getAllPokemons: any;
  public apiError: boolean = false;

  constructor (
    private pokeApiService: PokeApiService,
    private activeRoute: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons(this.paramsPage.off, this.paramsPage.limit).subscribe({
      next: res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
        this.pokeApiService.setParams(this.paramsPage);
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
