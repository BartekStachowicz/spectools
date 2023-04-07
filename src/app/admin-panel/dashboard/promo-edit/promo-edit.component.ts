import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';

import { PromoItem } from 'src/app/main-page/promo.model';
import { mimeType } from '../mime-type.validator';
import * as fromApp from '../../../store/app.reducer';
import * as MainPageActions from '../../../main-page/store/page-main.actions';

@Component({
  selector: 'app-promo-edit',
  templateUrl: './promo-edit.component.html',
  styleUrls: ['./promo-edit.component.css'],
})
export class PromoEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;
  promo: PromoItem;
  timer: ReturnType<typeof setTimeout>;
  timer2: ReturnType<typeof setTimeout>;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  reverseFileList: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(new MainPageActions.FetchPromo());
    this.sub = this.store
      .select('offer')
      .pipe(map((state) => state.promo))
      .subscribe((item: PromoItem) => {
        this.promo = item;
      });
  }

  onSubmit() {
    let data: PromoItem | FormData;
    if (this.selectedFiles) {
      data = new FormData();
      data.append('text1', this.form.value.text1);
      data.append('text2', this.form.value.text2);
      data.append('link1', this.form.value.link1);
      data.append('link2', this.form.value.link2);
      if (!this.reverseFileList) {
        data.append('images[]', this.selectedFiles[0]);
        data.append('images[]', this.selectedFiles[1]);
      } else if (this.reverseFileList) {
        data.append('images[]', this.selectedFiles[1]);
        data.append('images[]', this.selectedFiles[0]);
      }
    } else {
      data = this.form.value;
    }

    this.store.dispatch(new MainPageActions.UpdatePromo(data));
    this.store.dispatch(new MainPageActions.SavePromo());
    this.form.reset();
    this.timer2 = setTimeout(() => {
      this.previews = [];
      this.ngOnInit();
    }, 1000);
  }

  onSwitchImage() {
    this.reverseFileList = !this.reverseFileList;
    let previews = this.previews;
    [previews[0], previews[1]] = [previews[1], previews[0]];
    this.previews = previews;
  }

  ///////FILES UPLOAD
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  ///////

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    clearTimeout(this.timer);
    clearTimeout(this.timer2);
  }

  private initForm() {
    this.form = new FormGroup({
      text1: new FormControl(null, { validators: [Validators.required] }),
      text2: new FormControl(null, { validators: [Validators.required] }),
      imagePath1: new FormControl(null, { validators: [] }),
      imagePath2: new FormControl(null, { validators: [] }),
      images: new FormControl(null, {
        asyncValidators: [mimeType],
      }),
      link1: new FormControl(null),
      link2: new FormControl(null),
    });
  }
}
