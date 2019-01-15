import { Component, Input, OnChanges } from '@angular/core';

import { AuthService } from '../auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-auth-over',
  templateUrl: './auth-over.component.html',
  styleUrls: ['./auth-over.component.sass'],
  animations: [
    trigger('modalOpen', [
      state('false', style({
        transform: 'scale(0)'
      })),
      state('true', style({
        transform: 'scale(1)'
      })),
      transition('true <=> false', animate(200))
    ])
  ]
})
export class AuthOverComponent {
  @Input() modalOpen: string

  constructor(private authService: AuthService) { }

  onClose() {
    this.authService.modalOpen.next('false');
  }

}
