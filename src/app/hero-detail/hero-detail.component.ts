import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  // the activated route holds info about the route to this instance of HeroDetailComponent. This component is interested in the routes prepareEventListenerParameters, the identifierModuleUrl, to dispaly.
  //heroSerice gets hero data from the remote server and this component will used it to get the hero-to-display
  //location is an Angular service for interacting with the browser
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  //the paramMap is a dictionary of route paramter values extracted from the URL. "id" key returns the id of the hero to fetch
  //route params are always strings so the + operator converts the string to a num
  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroes(id)
    .subscribe(hero => this.hero = hero);
  }

  //uses location service to go backward one step in the brower's history stack 
  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }

}
