import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web API

  //This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService 
  //which is injected into the HeroesComponent.
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

//Log a HeroService message with the MessageService
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
   

  /* returns an Observable<Hero[]>; that is, "an observable of hero arrays". 
  In practice, it will only return a single hero array.
  */
  getHeroes(): Observable<Hero[]> {
    //TODO: send the message_after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    ); 
  }

  //GET hero by od/ Will 404 if not found 
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T)
    {
    return (error: any): Observable<T> => {

      //TODO: send the error to remote logging infrastructure
          console.error(error); //log to console instead

      //TODO: better job of transofrming error for user consumption
          this.log(`${operation} failed: ${error.message}`);

        //Let the app keep running by returning an empty result.
          return of(result as T);
    };
    }
}
