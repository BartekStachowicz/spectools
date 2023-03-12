import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('sidenavScroll', { read: ElementRef })
  matSidenavScroll: ElementRef;
  navLinks: any[];
  activeLinkId = -1;
  timerScroll: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.navLinks = [
      {
        label: 'Strona główna',
        link: './',
        index: 0,
        exact: true,
      },
      {
        label: 'Oferta',
        link: './oferta',
        index: 1,
        exact: false,
      },
      {
        label: 'Regulamin',
        link: './regulamin',
        index: 2,
        exact: true,
      },
      {
        label: 'Kontakt',
        link: './kontakt',
        index: 3,
        exact: true,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routePath) => {
        this.activeLinkId = this.navLinks.findIndex(
          (tab) => tab.link === '.' + routePath
        );

        this.timerScroll = setTimeout(() => {
          this.matSidenavScroll.nativeElement.scrollTop = 0;
          // document.querySelector('mat-sidenav-content').scrollTop = 0;
        }, 0);
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    clearTimeout(this.timerScroll);
  }
}
