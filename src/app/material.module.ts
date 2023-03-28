import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselModule } from 'primeng/carousel';
import { LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    DragDropModule,
    FlexLayoutModule,
    LayoutModule,
    CarouselModule,
    MatExpansionModule,
    ScrollingModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule,
  ],
})
export class MaterialModule {}
