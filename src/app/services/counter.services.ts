import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counter } from '../counter.model';
import { v4 as uuidv4 } from 'uuid';

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

  getUniqueCnt() {
    return parseInt(localStorage.getItem('uniqueCounter'));
  }

  getAllCnt() {
    return parseInt(localStorage.getItem('allCounter'));
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

  private getCounterUnique() {
    const counter = localStorage.getItem('uniqueCounter');
    return parseInt(counter);
  }
  private getCounterAll() {
    const counter = localStorage.getItem('allCounter');
    return parseInt(counter);
  }

  private setCounterUnique(counter: number) {
    localStorage.setItem('uniqueCounter', counter.toString());
  }
  private setCounterAll(counter: number) {
    localStorage.setItem('allCounter', counter.toString());
  }
}
