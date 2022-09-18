import { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable <Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroSerive: fetched heroes');
    return heroes;
    
  }
  getHero(id: number): Observable<Hero>{
    //Por ahora suponga que siempre existe un héroe con id especifico.
    //El manejo de herrores se agrega en el siguiente paso.

    const hero  = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
