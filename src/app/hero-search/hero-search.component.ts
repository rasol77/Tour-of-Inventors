import { Component, OnInit } from '@angular/core';

import { from, Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../heroes/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$! : Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //Empujar el termino de busqueda en la corriente.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //espera 300ms despues   de cada  pulsación de tecla antes de el término.
      debounceTime(300),

      //Ignorar el nuevo termino sí es igual término previo.
      distinctUntilChanged(),


      //Cambiar a una nueva  de busqueda cada  vez que el término cambie.
      switchMap((term: string) => this.heroService.searchHeroes(term)), 
    );
  }

}
