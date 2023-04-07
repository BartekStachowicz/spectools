import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.services';

@Component({
  selector: 'app-manuals',
  styleUrls: ['./manuals.component.css'],
  templateUrl: './manuals.component.html',
})
export class ManualsComponent implements OnInit, OnDestroy {
  offerSubscription: Subscription;
  offerItems: OfferItem[] = [];
  panelOpenState: boolean = false;
  offerItem: OfferItem = null;
  itemDisplay: boolean = false;
  timer: ReturnType<typeof setTimeout>;
  filePreview: string = null;
  form: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => (this.offerItems = items));
  }

  onItemPicked(id: string) {
    this.ngOnInit();
    this.offerItem = this.offerItems.find((item) => item.id === id);
    this.itemDisplay = true;
    this.panelOpenState = false;
  }

  onSave() {
    let data = new FormData();
    data.append('pdfFile', this.form.value.pdfFile);
    data.append('itemId', this.offerItem.id);
    this.dashboardService.updateManual(data);
    this.timer = setTimeout(() => {
      this.itemDisplay = false;
      this.filePreview = null;
      this.ngOnInit();
    }, 1000);
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.filePreview = file.name;
    this.form.patchValue({
      pdfFile: file,
    });
    this.form.get('pdfFile').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }

    clearTimeout(this.timer);
  }

  private initForm() {
    this.form = new FormGroup({
      pdfFile: new FormControl(null),
      itemId: new FormControl(null),
    });
  }
}
