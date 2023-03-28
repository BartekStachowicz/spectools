import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

const API_URL_COUNTER_UNIQUE =
  environment.apiURL + environment.apiCounterUniqueKey;
const API_URL_COUNTER_ALL = environment.apiURL + environment.apiCounterAllKey;

@Injectable({ providedIn: 'root' })
export class CounterServices {
  visitorUniqueCounter = 0;
  visitorAllCounter = 0;
  constructor(private http: HttpClient) {}

  countUniqueVisits() {
    const cookieUniqueId = this.getCookie('uniqueId');
    if (!cookieUniqueId) {
      this.visitorUniqueCounter = this.getCounterUnique() | 0;
      this.visitorUniqueCounter = this.visitorUniqueCounter + 1;
      this.setCounterUnique(this.visitorUniqueCounter);
    }

    this.setCookie('uniqueId', this.generateUniqueId(), 1);
  }

  countAllVisits() {
    this.visitorAllCounter = this.getCounterAll() | 0;
    this.visitorAllCounter = this.visitorAllCounter + 1;
    this.setCounterAll(this.visitorAllCounter);
  }

  private setCookie(name: string, uniqueId: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
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

  public getCounterUnique() {
    const counter = localStorage.getItem('uniqueCounter');
    this.http.get(API_URL_COUNTER_UNIQUE).subscribe();
    return parseInt(counter);
  }
  public getCounterAll() {
    const counter = localStorage.getItem('allCounter');
    this.http.get(API_URL_COUNTER_ALL).subscribe();
    return parseInt(counter);
  }

  private setCounterUnique(counter: number) {
    localStorage.setItem('uniqueCounter', counter.toString());
    this.http.post(API_URL_COUNTER_UNIQUE, counter).subscribe();
  }
  private setCounterAll(counter: number) {
    localStorage.setItem('allCounter', counter.toString());
    this.http.post(API_URL_COUNTER_ALL, counter).subscribe();
  }
}
