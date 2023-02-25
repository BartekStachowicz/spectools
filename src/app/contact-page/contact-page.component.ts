import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, shareReplay } from 'rxjs';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
      }),
    ],
    zoom: 15,
    center: { lat: 50.386667, lng: 21.356111 },
  };

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.initContactForm();
  }

  onSubmit() {}

  private initContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  initMarkers() {
    const initialMarkers = {
      position: { lat: 50.386667, lng: 21.356111 },
      draggable: true,
    };

    const marker = this.generateMarker(initialMarkers, 0);
    marker
      .addTo(this.map)
      .bindPopup(`<b>SpecTools Dawid Rzemieniarz</b>`)
      .openPopup();
    this.map.panTo(initialMarkers.position);
    this.markers.push(marker);
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {}

  markerClicked($event: any, index: number) {}

  markerDragEnd($event: any, index: number) {}
}
