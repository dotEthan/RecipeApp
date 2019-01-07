import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }
  @Input() authType: string;
  @Input() errorMsg: string;


  ngOnInit() { }

  onSignin(form: NgForm) {
    (this.authType === 'register') ? this.authService.signupUser(form.value.email, form.value.password) : this.authService.signinUser(form.value.email, form.value.password);

  }

  onClick(type: string) {
    this.authService.authType.next(type);
  }
}
