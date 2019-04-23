import { Component, Input, OnChanges } from '@angular/core';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth-over',
  templateUrl: './auth-over.component.html',
  styleUrls: ['./auth-over.component.sass']
})
export class AuthOverComponent {
  // @Input() modalOpen: boolean

  constructor(private authService: AuthService) { }

  onClose() {
    this.authService.modalOpen.next(false);
  }

}
