import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Hero } from './heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService{
  createDb() {

    const heroes =[
      {id:11, name: 'Arquímedes', invent: 'Principio de Arquímedes'},
      { id: 12, name: 'L. Da Vinci', invent: 'Paracáidas'},
       { id: 13, name: 'Galileo', invent:'Telescopio' },
       { id: 14, name: 'Isaac Newton', invent: "Gravedad Universal" },
       { id: 15, name: 'Blaise Pascal', invent: 'Calculadora' },
       { id: 16, name: 'Alessandro Volta', invent: 'Batería' },
       { id: 17, name: 'Nikola Tesla', invent:'Bobina Eléctrica' },
       { id: 18, name: 'Thomas Edison' ,invent:'Bombilla' },
       { id: 19, name: 'Johan Gutemberg', invent: 'Imprenta' },
       { id: 20, name: 'Albert Einstein', invent: 'Relatividad' }
    ];
    return {heroes};
  }
  //Anula el método GenId que garantiza un héroe siempre tenga un id.
  //Si el array de heroes es vacío el siguiente método devuelve un Nº inicial.
  //Si el array de heroes no está vacío, el siguiente método
  //retorna el ID del héroe más alta. +1.
  genId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id))+1: 11;
  } 
  
}
