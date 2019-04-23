import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.sass']
})
export class AuthModalComponent {
  modalOpen = false
  constructor(private authService: AuthService) { }

  onOverlayShadowClick() {
    this.authService.modalOpen.next(false);
  }

}
