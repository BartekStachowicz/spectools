import { HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();

const iconUrl = [
  'assets/spectools/logo-small-c.png',
  'assets/icons/5km-icon.png',
  'assets/icons/10km-icon.png',
  'assets/icons/15km-icon.png',
];
const spectools = L.icon({
  iconUrl: iconUrl[0],
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
const area5 = L.icon({
  iconUrl: iconUrl[1],
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
const area10 = L.icon({
  iconUrl: iconUrl[2],
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
const area15 = L.icon({
  iconUrl: iconUrl[3],
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
// L.Marker.prototype.options.icon = spectools;

export class LeafletMapService {
  private lat = 50.376045250000004;
  private lng = 21.32276775;
  public map: any;
  public circle15: any;
  public circle10: any;
  public circle5: any;
  public marker: any;
  public marker5: any;
  public marker10: any;
  public marker15: any;

  async geoSearch(address: string) {
    const results = await provider.search({ query: address });
    const foundLat = results[0].y;
    const foundLng = results[0].x;

    const placeFrom = new L.LatLng(this.lat, this.lng);
    const placeTo = new L.LatLng(foundLat, foundLng);

    const distance = placeFrom.distanceTo(placeTo) / 1000;

    const price5: string | boolean = distance <= 5 ? 'GRATIS' : false;
    const price10: string | boolean =
      distance > 5 && distance <= 10 ? '30zł' : false;
    const price15: string | boolean =
      distance > 10 && distance <= 15 ? '50zł' : false;
    const priceGreater15: string | boolean =
      distance > 15 ? 'Koszt ustalimy indywidualnie' : false;

    if (price5) return price5;
    if (price10) return price10;
    if (price15) return price15;
    if (priceGreater15) return priceGreater15;
  }

  initMap(map: string) {
    this.map = L.map(map).setView([this.lat, this.lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy;',
    }).addTo(this.map);

    this.map.scrollWheelZoom.disable();

    this.marker5 = L.marker([this.lat, 21.4075], { icon: area5 }).addTo(
      this.map
    );
    this.marker10 = L.marker([this.lat, 21.478], { icon: area10 }).addTo(
      this.map
    );
    this.marker15 = L.marker([this.lat, 21.5485], { icon: area15 }).addTo(
      this.map
    );

    this.marker = L.marker([this.lat, this.lng], { icon: spectools }).addTo(
      this.map
    );

    this.circle15 = L.circle([this.lat, this.lng], {
      color: '#263238',
      fillColor: '#607d8b',
      fillOpacity: 0.2,
      radius: 15000,
    }).addTo(this.map);

    this.circle10 = L.circle([this.lat, this.lng], {
      color: '#ff6f00',
      fillColor: '#ffc107',
      fillOpacity: 0.2,
      radius: 10000,
    }).addTo(this.map);

    this.circle5 = L.circle([this.lat, this.lng], {
      color: '#263238',
      fillColor: '#607d8b',
      fillOpacity: 0.2,
      radius: 5000,
    }).addTo(this.map);
  }
}
