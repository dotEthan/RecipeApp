import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth-modal/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.sass']
})
export class AuthModalComponent implements OnInit {
  modalOpen = false
  authType: string
  error: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authType.subscribe(
      (type: string) => {
        this.modalOpen = true;
        this.authType = type;
      }
    );

    this.authService.errorMsg.subscribe(
      (msg: string) => {
        this.error = msg;
      }
    );

    this.authService.modalOpen.subscribe(
      (shouldOpen: boolean) => {
        this.modalOpen = shouldOpen;
      }
    );
  }

  onClose() {
    this.modalOpen = false;
  }

}
