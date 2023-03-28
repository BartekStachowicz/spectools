import { Component, OnInit } from '@angular/core';

import { CounterServices } from 'src/app/services/counter.services';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent implements OnInit {
  constructor(private counterService: CounterServices) {}

  uniqueCnt = this.counterService.getCounterUnique();
  allCnt = this.counterService.getCounterAll();

  ngOnInit() {}
}
