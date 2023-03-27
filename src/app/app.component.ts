import { Component, OnInit } from '@angular/core';

import { CounterServices } from './services/counter.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'spectools';

  constructor(private counterService: CounterServices) {}

  ngOnInit(): void {
    this.counterService.countUniqueVisits();
    this.counterService.countAllVisits();
  }
}
