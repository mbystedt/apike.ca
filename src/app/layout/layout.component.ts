import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { MatExpansionPanel, MatSidenav } from '@angular/material';

/**
 * The layout component displays header and footer of the page.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public loading: boolean = true;

  @ViewChild(MatExpansionPanel)
  private matExpansionPanelComponent: MatExpansionPanel;
  @ViewChild(MatSidenav)
  private matSidenavComponent: MatSidenav;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {

      if (event instanceof NavigationStart) {
        this.matExpansionPanelComponent.close();
        this.matSidenavComponent.close();
        this.loading = true;
      }

      if (event instanceof NavigationEnd) {
        this.loading = false;
      }

    });
    
    this.loading = false;
  }

}
