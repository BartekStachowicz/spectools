import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';
import { AdminPanelServices } from '../../services/admin-panel.services';
import { mimeType } from '../mime-type.validator';
import * as fromApp from '../../../store/app.reducer';
import * as MainPageActions from '../../../main-page/store/page-main.actions';

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
  editedId: string = null;
  timer: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(new MainPageActions.FetchItems());
    this.sub = this.adminPanelService.getMode().subscribe((mode) => {
      this.mode = mode;
    });
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => {
        this.offerItems = items;
      });
  }

  onItemPicked(id: string) {
    this.ngOnInit();
    const item = this.offerItems.find((item) => item.id === id);
    this.editedId = item.id;
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
      calendarFlag: item.calendarFlag,
    });
    this.imgPreview = item.imagePath;
    this.panelOpenState = false;
  }

  onSubmit() {
    if (this.mode === 'edit') {
      let data: OfferItem | FormData;

      data = new FormData();
      data.append('name', this.form.value.name);
      data.append('priceRent', this.form.value.priceRent);
      data.append('priceCaution', this.form.value.priceCaution);
      data.append('description', this.form.value.description);
      data.append('shortDescription', this.form.value.shortDescription);
      data.append('technicalCondition', this.form.value.technicalCondition);
      data.append('minRentalPeriod', this.form.value.minRentalPeriod);
      data.append('rentOnlineURL', this.form.value.rentOnlineURL);
      data.append('calendarFlag', this.form.value.calendarFlag);
      data.append('image', this.form.value.image);

      this.store.dispatch(
        new MainPageActions.UpdateItem({ item: data, id: this.editedId })
      );
      this.store.dispatch(new MainPageActions.SaveUpdatedItem());
    } else if (this.mode === 'new') {
      const data = new FormData();
      data.append('name', this.form.value.name);
      data.append('priceRent', this.form.value.priceRent);
      data.append('priceCaution', this.form.value.priceCaution);
      data.append('description', this.form.value.description);
      data.append('shortDescription', this.form.value.shortDescription);
      data.append('technicalCondition', this.form.value.technicalCondition);
      data.append('minRentalPeriod', this.form.value.minRentalPeriod);
      data.append('rentOnlineURL', this.form.value.rentOnlineURL);
      data.append('calendarFlag', this.form.value.calendarFlag);
      data.append('image', this.form.value.image);
      this.store.dispatch(new MainPageActions.AddItem(data));
      this.store.dispatch(new MainPageActions.SaveNewItem());
    }
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setErrors(null);
    });
    this.timer = setTimeout(() => {
      this.imgPreview = '';
      this.ngOnInit();
    }, 1000);
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

  onDelete() {
    this.store.dispatch(new MainPageActions.DeleteItem(this.editedId));
    this.store.dispatch(new MainPageActions.SaveDeletedItem());
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setErrors(null);
    });
    this.timer = setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }

    clearTimeout(this.timer);
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
      calendarFlag: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}
