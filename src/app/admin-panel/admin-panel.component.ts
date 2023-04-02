import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService,
    private router: Router
  ) {}

  mode: string;
  sub: Subscription;
  loginForm: FormGroup;
  isLoading: boolean = false;
  isAuth: boolean = false;
  sub2: Subscription;
  loginError: string = null;

  ngOnInit(): void {
    this.isLoading = false;
    this.isAuth = this.authService.getIsAuth();
    this.sub = this.authService.getAuthStatusListener().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
    this.initLoginForm();
    if (this.isAuth) {
      this.router.navigate(['admin', 'dashboard']);
    }
  }

  onModeChange(mode: string) {
    this.adminPanelService.setMode(mode);
  }

  onLogout() {
    this.isAuth = false;
    this.authService.logout();
  }

  onSubmit() {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.isLoading = true;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
