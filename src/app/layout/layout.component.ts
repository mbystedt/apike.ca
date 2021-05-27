import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatExpansionPanel } from '@angular/material/expansion';

/**
 * The layout component displays header and footer of the page.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public loading = true;

  @ViewChild(MatExpansionPanel, { static: true })
  private matExpansionPanelComponent!: MatExpansionPanel;
  @ViewChild(MatSidenav, { static: true })
  private matSidenavComponent!: MatSidenav;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => {

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
