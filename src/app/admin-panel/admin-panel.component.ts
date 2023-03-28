import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { AdminPanelServices } from './services/admin-panel.services';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  constructor(
    private adminPanelService: AdminPanelServices,
    private authService: AuthService
  ) {}

  isLogged = false;
  mode: string;
  sub: Subscription;

  ngOnInit(): void {
    this.sub = this.authService.getIsLogged().subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  onModeChange(mode: string) {
    this.adminPanelService.setMode(mode);
  }

  onLogout() {
    this.isLogged = false;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
