import { Injectable } from '@angular/core';

import * as L from 'leaflet';

const iconUrl = 'assets/logo-small.png';
const iconDefault = L.icon({
  iconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
L.Marker.prototype.options.icon = iconDefault;

export class LeafletMapService {
  private lat = 50.37871;
  private lng = 21.33698;
  public map: any;
  public circle15: any;
  public circle10: any;
  public circle5: any;
  public marker: any;

  initMap(map: string) {
    this.map = L.map(map).setView([this.lat, this.lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy;',
    }).addTo(this.map);

    this.marker = L.marker([this.lat, this.lng]).addTo(this.map);

    this.circle15 = L.circle([this.lat, this.lng], {
      color: '#ff6f00',
      fillColor: '#ffc107',
      fillOpacity: 0.2,
      radius: 15000,
    }).addTo(this.map);

    this.circle10 = L.circle([this.lat, this.lng], {
      color: '#263238',
      fillColor: '#607d8b',
      fillOpacity: 0.2,
      radius: 10000,
    }).addTo(this.map);

    this.circle5 = L.circle([this.lat, this.lng], {
      color: '#ff6f00',
      fillColor: '#ffc107',
      fillOpacity: 0.2,
      radius: 5000,
    }).addTo(this.map);
  }
}
