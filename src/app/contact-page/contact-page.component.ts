import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, shareReplay } from 'rxjs';
import { LeafletMapService } from '../services/leaflet-map.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  providers: [LeafletMapService],
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;
  isSuccessfull: number = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private leafletMapService: LeafletMapService
  ) {}

  ngOnInit(): void {
    this.initContactForm();
    this.leafletMapService.initMap('map2');
  }

  onSubmit() {
    emailjs
      .send(
        'service_616sbw8',
        'template_gj1pl3n',
        {
          from_email: this.contactForm.value.email,
          from_name: this.contactForm.value.name,
          from_message: this.contactForm.value.message,
        },
        'Rp99PKF2akfrzqJ8Q'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          this.isSuccessfull = 200;
          setTimeout(() => (this.isSuccessfull = 0), 1000);
        },
        (error) => {
          this.isSuccessfull = 500;
        }
      );
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contactForm.controls[key].setErrors(null);
    });
  }

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
}
