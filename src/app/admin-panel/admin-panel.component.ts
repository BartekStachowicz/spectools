import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { AdminPanelServices } from './services/admin-panel.services';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  constructor(
    private adminPanelService: AdminPanelServices,
    private route: ActivatedRoute
  ) {}

  isLogged = true;
  mode: string;
  sub: Subscription;

  onModeChange(mode: string) {
    this.adminPanelService.setMode(mode);
  }
}
