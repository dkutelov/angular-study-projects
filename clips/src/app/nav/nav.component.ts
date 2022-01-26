import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() tabTitle = '';

  constructor(public modal: ModalService, public authService: AuthService) {}

  ngOnInit(): void {}

  openModal(event: Event) {
    event.preventDefault();
    this.modal.toggleModal('auth');
  }

  async logout(event: Event) {
    event.preventDefault();
    await this.authService.logoutUser();
  }
}
