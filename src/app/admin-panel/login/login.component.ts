import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  loginForm: FormGroup;
  isLoading: boolean = false;
  isAuth: boolean = false;
  sub: Subscription;

  ngOnInit(): void {
    this.isLoading = false;
    this.isAuth = this.authService.getIsAuth();
    this.sub = this.authService.getAuthStatusListener().subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log(isAuth);
    });
    this.initLoginForm();
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
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
