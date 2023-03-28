import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  loginForm: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = false;
    this.initContactForm();
  }

  onSubmit() {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.isLoading = true;
  }

  private initContactForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
