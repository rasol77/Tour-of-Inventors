import { Hero } from './heroes/hero';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  

  private heroesUrl = 'api/heroes'; //URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

    //GET heroes desde el servidor.
  getHeroes(): Observable <Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes') ),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    
  }

  //GET héroe por Id. Retorna 'undefined' cuando el Id no funciona.
  getHero404<Data>(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/?id=${id}`;
   return this.http.get<Hero[]>(url)
   .pipe(
   map(heroes => heroes[0]), //retorna un {0|1} elemento del array.
   tap(h => {
      const outcome = h ? 'fetched' : 'didnt find';
      this.log(`${outcome} hero id=${id}`);
   }),
   catchError(this.handleError<Hero>(`getHero id=${id}`))
   );
  
  }

  //GET héroe por Id. Con error 404 not found.
  getHero(id: number): Observable<Hero>{
    //Por ahora suponga que siempre existe un héroe con id especifico.
    

   const url = `${this.heroesUrl}/${id}`;
   return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
   );
  }
  
   //GET Busqueda de héroes por su nombre.
   searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      //si no encuentra el termino, retorna un array vacío.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(X => X.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  ///////////////Modos de Guardado///////////////////////////////////////

  //PUT: actualizar el héroe en el servidor.
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  } 

  //POST: añadir nuevo inventor al servidor.
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //DELETE: Borrar el héroe del servidor.
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deletedHero'))
    );
  }

 
  /*
  *Manejar la operación HTTP que fallo dejar que la app continué.
    
  * @param operation - nombre de la oeración que fallo.
  * @param result - valor opcional que retorna el resultado.
  */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>   {

      //TODO: envia el error para el login remoto.
      console.error(error); 

      //TODO: mejor trabajo de tranformación  de error  
      // para el usuario.
      this.log(`${operation} failed: ${error.message}`)

      //Deje que la app siga ejecutando un resultado vacío.
      return of(result as T);
      
    };
  }
  //LOG  Servicios del Héroe con un mensaje del Servicio de mensajes. 
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
    
  }
}


