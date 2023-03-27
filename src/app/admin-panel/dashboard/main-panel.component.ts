import { Component } from '@angular/core';
import { CounterServices } from 'src/app/services/counter.services';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent {
  constructor(private counterService: CounterServices) {}

  uniqueCnt = this.counterService.getUniqueCnt();
  allCnt = this.counterService.getAllCnt();
}
