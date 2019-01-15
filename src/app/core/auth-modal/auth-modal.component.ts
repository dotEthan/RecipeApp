import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.sass']
})
export class AuthModalComponent implements OnInit {
  modalOpen = 'false'
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.modalOpen.subscribe(
      (shouldOpen: string) => {
        this.modalOpen = shouldOpen;
      }
    );
  }

}
