import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navLinks: any[];
  activeLinkId = -1;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.navLinks = [
      {
        label: 'Strona główna',
        link: '/',
        index: 0,
        exact: true,
      },
      {
        label: 'Oferta',
        link: '/oferta',
        index: 1,
        exact: false,
      },
      {
        label: 'Regulamin',
        link: '/regulamin',
        index: 2,
        exact: true,
      },
      {
        label: 'Kontakt',
        link: '/kontakt',
        index: 3,
        exact: true,
      },
    ];
  }

  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     document.querySelector('.mat-sidenav-content').scrollTop = 0;
    //   });

    // this.router.events.subscribe((res) => {
    //   this.activeLinkId = this.navLinks.indexOf(
    //     this.navLinks.find((tab) => tab.link === '.' + this.router.url)
    //   );
    // });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routePath) => {
        document.querySelector('.mat-sidenav-content').scrollTop = 0;
        this.activeLinkId = this.navLinks.findIndex(
          (tab) => tab.link === '.' + routePath
        );
      });
  }
}
