import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CounterServices } from 'src/app/services/counter.services';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent implements OnInit, OnDestroy {
  constructor(private counterService: CounterServices) {}

  uniqueCnt: number;
  allCnt: number;
  sub1: Subscription;
  sub2: Subscription;

  ngOnInit() {
    this.sub1 = this.counterService
      .getCntUnique()
      .subscribe((cnt) => (this.uniqueCnt = cnt));
    this.sub2 = this.counterService
      .getCntAll()
      .subscribe((cnt) => (this.allCnt = cnt));
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
