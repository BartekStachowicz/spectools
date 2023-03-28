import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { PromoItem } from 'src/app/main-page/promo.model';
import { mimeType } from '../mime-type.validator';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-promo-edit',
  templateUrl: './promo-edit.component.html',
  styleUrls: ['./promo-edit.component.css'],
})
export class PromoEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  imgPreview: string;
  imgPreview2: string;
  sub: Subscription;
  promo: PromoItem;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.form.setValue({
      text1: this.promo.text1,
      text2: this.promo.text2,
      images: [this.promo.imagePath1, this.promo.imagePath2],
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
    if (files[0]) {
      const file1 = files[0];
      this.form.patchValue({
        images: file1,
      });
      this.form.get('images').updateValueAndValidity();
      const reader1 = new FileReader();

      reader1.onload = () => {
        this.imgPreview = reader1.result as string;
      };
      reader1.readAsDataURL(file1);
    }

    if (files[1]) {
      const file2 = files[1];
      this.form.patchValue({
        images: file2,
      });
      this.form.get('images').updateValueAndValidity();
      const reader2 = new FileReader();

      reader2.onload = () => {
        this.imgPreview2 = reader2.result as string;
      };
      reader2.readAsDataURL(file2);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private initForm() {
    this.form = new FormGroup({
      text1: new FormControl(null, { validators: [Validators.required] }),
      text2: new FormControl(null, { validators: [Validators.required] }),
      images: new FormControl(null, {
        asyncValidators: [mimeType],
      }),
    });
  }

  private loadData() {
    this.sub = this.store
      .select('offer')
      .pipe(map((state) => state.promo))
      .subscribe((item: PromoItem) => {
        this.promo = item;
      });
  }
}
