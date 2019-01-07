import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './core/auth-modal/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDqrQ1nMg4RIeVIf1yH_10Tn1D1SMFbUm0",
      authDomain: "angular-testing-a4072.firebaseapp.com"
    });

    // this.authService.signinUser('estrauss2018@gmail.com', 'password');
  }
}
