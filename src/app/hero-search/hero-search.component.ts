import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();


  constructor(private heroService: HeroService) { }

  //push a search term into the Observable stream
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term
      debounceTime(300),

      //ignore new term if same as previous term, ensures a request is only sent if the filter text changed
      distinctUntilChanged(),
      //calls the search service for each search term that makes it through debounce() and distinctuntilchanged(). 
      //it cancels and discards previous search observables, returning only the latest search service observable 
      switchMap((term: string) => 
      this.heroService.searchHeroes(term)),
    );
  }

}
