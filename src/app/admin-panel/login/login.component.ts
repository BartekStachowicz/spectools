import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.initContactForm();
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.router.navigate(['admin', 'dashboard']);
  }

  private initContactForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
