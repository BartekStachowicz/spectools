import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';
import { AdminPanelServices } from '../../services/admin-panel.services';
import { mimeType } from '../mime-type.validator';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css'],
})
export class OfferEditComponent implements OnInit, OnDestroy {
  constructor(
    private adminPanelService: AdminPanelServices,
    private store: Store<fromApp.AppState>
  ) {}

  mode: string;
  sub: Subscription;
  offerSubscription: Subscription;
  panelOpenState: boolean = false;
  imgPreview: string;
  form: FormGroup;
  isLoading: boolean = false;
  offerItems: OfferItem[] = [];

  ngOnInit(): void {
    this.sub = this.adminPanelService.getMode().subscribe((mode) => {
      this.mode = mode;
    });
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => (this.offerItems = items));
    this.initForm();
  }

  onItemPicked(id: string) {
    const item = this.offerItems.find((item) => item.id === id);
    console.log(item);
    this.form.setValue({
      image: item.imagePath,
      name: item.name,
      priceRent: item.priceRent,
      priceCaution: item.priceCaution,
      shortDescription: item.shortDescription,
      description: item.description,
      technicalCondition: item.technicalCondition,
      minRentalPeriod: item.minRentalPeriod,
      rentOnlineURL: item.rentOnlineURL,
    });
  }

  onSubmit() {
    if (this.mode === 'edit') {
      console.log('edit');
    } else if (this.mode === 'new') {
      console.log('new');
    }

    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setErrors(null);
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.offerSubscription.unsubscribe();
  }

  private initForm() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        asyncValidators: [mimeType],
      }),
      name: new FormControl(null, { validators: [Validators.required] }),
      priceRent: new FormControl(null, { validators: [Validators.required] }),
      priceCaution: new FormControl(null, {
        validators: [Validators.required],
      }),
      shortDescription: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      technicalCondition: new FormControl(null, {
        validators: [Validators.required],
      }),
      minRentalPeriod: new FormControl(null, {
        validators: [Validators.required],
      }),
      rentOnlineURL: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}
