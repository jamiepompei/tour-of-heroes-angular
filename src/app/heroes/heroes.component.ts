import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


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

  /**When the given name is non-blank the handler creates a Hero-like object from the name and passes it to the services 
   * addHero() method. When the addHero() saves successfully, the subscribe() callback recieves the new hero and pushes it into to the heroes list
   * for display */
  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        }); 
  }

    delete(hero: Hero): void{
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero).subscribe();
    }

}
