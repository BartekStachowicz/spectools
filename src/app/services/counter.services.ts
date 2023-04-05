import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

const API_URL_COUNTER_UNIQUE =
  environment.apiURL + environment.apiCounterUniqueKey;
const API_URL_COUNTER_ALL = environment.apiURL + environment.apiCounterAllKey;

@Injectable({ providedIn: 'root' })
export class CounterServices {
  cntAll: Subject<number> = new BehaviorSubject(0);
  cntUnique: Subject<number> = new BehaviorSubject(0);
  visitorUniqueCounter = 0;
  visitorAllCounter = 0;

  constructor(private http: HttpClient) {}

  getCntAll() {
    return this.cntAll.asObservable();
  }

  getCntUnique() {
    return this.cntUnique.asObservable();
  }

  getCounterUnique() {
    const cookieUniqueId = this.getCookie('uniqueId');
    if (!cookieUniqueId) {
      this.http
        .get<{ counter: number }>(API_URL_COUNTER_UNIQUE)
        .subscribe((cnt) => {
          this.visitorUniqueCounter = cnt.counter | 0;
          this.visitorUniqueCounter = this.visitorUniqueCounter + 1;
          this.cntUnique.next(this.visitorUniqueCounter);
          this.setCounterUnique(this.visitorUniqueCounter);
        });
    }
    this.http
      .get<{ counter: number }>(API_URL_COUNTER_UNIQUE)
      .subscribe((cnt) => {
        this.cntUnique.next(cnt.counter);
      });
    this.setCookie('uniqueId', this.generateUniqueId(), 1);
  }
  getCounterAll() {
    this.http.get<{ counter: number }>(API_URL_COUNTER_ALL).subscribe((cnt) => {
      this.visitorAllCounter = cnt.counter | 0;
      this.visitorAllCounter = this.visitorAllCounter + 1;
      this.cntAll.next(this.visitorAllCounter);
      this.setCounterAll(this.visitorAllCounter);
    });
  }

  private setCookie(name: string, uniqueId: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 12 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + uniqueId + ';' + expires + ';path=/';
  }

  private getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  private generateUniqueId(): string {
    return uuidv4();
  }

  private setCounterUnique(counter: number) {
    // localStorage.setItem('uniqueCounter', counter.toString());
    this.http
      .patch(API_URL_COUNTER_UNIQUE, {
        counter: counter,
      })
      .subscribe();
  }
  private setCounterAll(counter: number) {
    // localStorage.setItem('allCounter', counter.toString());
    this.http
      .patch(API_URL_COUNTER_ALL, {
        counter: counter,
      })
      .subscribe();
  }
}
