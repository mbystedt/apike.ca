import { Component } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

/**
 * The root component for the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // import Angulartics2GoogleGlobalSiteTag in root component
  constructor(angulartics: Angulartics2GoogleGlobalSiteTag) {
    // Start tracking
    angulartics.startTracking();
  }
}
