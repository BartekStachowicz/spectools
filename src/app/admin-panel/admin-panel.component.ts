import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isAuth = false;
  mode: string;
  sub: Subscription;

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.sub = this.authService.getAuthStatusListener().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  onModeChange(mode: string) {
    this.adminPanelService.setMode(mode);
  }

  onLogout() {
    this.isAuth = false;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
