import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  
  
  constructor(private heroService: HeroService,) { 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  //asynch approach that passes the emitted array to the callback, which sets the component's heroes property
  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

}
