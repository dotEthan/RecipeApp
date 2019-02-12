import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';

// import * as fromApp from '../store/app-reducer';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('recipes initializing');
  }

}
