import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../core/auth-modal/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent implements OnInit {
  testMode: boolean;
  loggedInObservable: Observable<boolean>;
  loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.testMode.subscribe(isTestMode => {
      this.testMode = isTestMode;
    });

    this.authService.loggedIn.subscribe(isloggedIn => this.loggedIn = isloggedIn);

  }

}
