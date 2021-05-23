import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

import { GalleryComponent } from './drupal-bridge/gallery/gallery.component';
import { MovieBoxComponent } from './drupal-bridge/movie-box/movie-box.component';
import { ImageComponent } from './drupal-bridge/image/image.component';
import { SvgColorTableComponent } from './drupal-bridge/svg-color-table/svg-color-table.component';
import { SearchComponent } from './drupal-bridge/search/search.component';
import { isPlatformBrowser } from '@angular/common';

declare var require: any;

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
  constructor(@Inject(PLATFORM_ID) private platform: Object, injector: Injector, angulartics: Angulartics2GoogleGlobalSiteTag) {
    // Start tracking
    angulartics.startTracking();

    const registerElement = (tagName: string, component: any) => {
      const { createCustomElement } = require('@angular/elements');
      // Convert component to a custom element.
      const element = createCustomElement(component, {injector});
      // Register the custom element with the browser.
      customElements.define(tagName, element);
    };

    if (isPlatformBrowser(this.platform)) {
      // Register angular elements for CMS content
      registerElement('apike-gallery', GalleryComponent);
      registerElement('apike-moviebox', MovieBoxComponent);
      registerElement('apike-image', ImageComponent);
      registerElement('apike-svg-colortable', SvgColorTableComponent);
      registerElement('apike-search', SearchComponent);
    }
  }
}
