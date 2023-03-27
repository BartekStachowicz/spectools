import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelServices {
  private mode: Subject<string> = new BehaviorSubject('new');

  getMode() {
    return this.mode.asObservable();
  }

  setMode(mode: string) {
    this.mode.next(mode);
  }
}
