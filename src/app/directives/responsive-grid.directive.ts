import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';

export interface ColsSetting {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

@Directive({
  selector: '[responsiveMatGrid]',
})
export class ResponsiveGridDirective implements OnInit, OnChanges {
  @Output() currentSize = new EventEmitter<string>();
  @Input('colsSetting') colsSetting: ColsSetting = {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
  };

  public constructor(
    private matGrid: MatGridList,
    private breakpointObserver: BreakpointObserver
  ) {
    if (this.matGrid != null) {
      this.matGrid.cols = this.colsSetting.md;
    }
  }

  public ngOnInit(): void {
    this.updateGrid();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.colsSetting) {
      this.updateGrid();
    }
  }

  private updateGrid(): void {
    if (this.matGrid != null) {
      this.matGrid.cols = this.colsSetting.md;
    }
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.matGrid.cols = this.colsSetting.xs;
          this.currentSize.emit('xs');
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.matGrid.cols = this.colsSetting.sm;
          this.currentSize.emit('sm');
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.matGrid.cols = this.colsSetting.md;
          this.currentSize.emit('md');
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.matGrid.cols = this.colsSetting.lg;
          this.currentSize.emit('lg');
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.matGrid.cols = this.colsSetting.xl;
          this.currentSize.emit('xl');
        }
      });
  }
}
