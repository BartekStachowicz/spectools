import { Component, OnInit } from '@angular/core';
import { AuthService } from './admin-panel/auth/auth.service';

import { CounterServices } from './services/counter.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'spectools';

  constructor(
    private counterService: CounterServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.counterService.countUniqueVisits();
    this.counterService.countAllVisits();
    this.authService.autoLogin();
  }
}
