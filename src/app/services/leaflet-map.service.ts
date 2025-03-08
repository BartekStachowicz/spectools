import { HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { RawResult } from 'leaflet-geosearch/dist/providers/bingProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

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
  private lat = 50.38571739079916;
  private lng = 21.351666879797744;
  public map: any;
  public circle15: any;
  public circle10: any;
  public circle5: any;
  public marker: any;
  public marker5: any;
  public marker10: any;
  public marker15: any;

  async geoSearch(address: string) {
    try {
      const results = await provider.search({ query: address });

      return this.calcDistance(results[0]);
    } catch {
      return 'Coś poszło nie tak! Sprawdź poprawność adresu.';
    }
  }

  calcDistance(result: any) {
    const foundLat = result.y;
    const foundLng = result.x;
    const placeFrom = new L.LatLng(this.lat, this.lng);
    const placeTo = new L.LatLng(foundLat, foundLng);
    const distance = placeFrom.distanceTo(placeTo) / 1000;

    if (distance <= 5) {
      return 'GRATIS';
    } else if (distance > 5 && distance <= 10) {
      return '30zł';
    } else if (distance > 10 && distance <= 15) {
      return '50zł';
    } else if (distance > 15) {
      return 'Koszt ustalimy indywidualnie';
    } else {
      return 'Coś poszło nie tak! Sprawdź poprawność adresu.';
    }
  }

  initMap(map: string) {
    this.map = L.map(map).setView([this.lat, this.lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy;',
    }).addTo(this.map);

    this.map.scrollWheelZoom.disable();

    /*this.marker5 = L.marker([this.lat, 21.393], { icon: area5 }).addTo(
      this.map
    );
    this.marker10 = L.marker([this.lat, 21.464], { icon: area10 }).addTo(
      this.map
    );
    this.marker15 = L.marker([this.lat, 21.555], { icon: area15 }).addTo(
      this.map
    );*/

    this.marker = L.marker([this.lat, this.lng], { icon: spectools }).addTo(
      this.map
    );

    /*this.circle15 = L.circle([this.lat, this.lng], {
      color: '#263238',
      fillColor: '#607d8b',
      fillOpacity: 0.2,
      radius: 16500,
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
    }).addTo(this.map); */
  }
}
