import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { createCustomElement } from '@angular/elements';
// import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

import { GalleryComponent } from './drupal-bridge/gallery/gallery.component';
import { MovieBoxComponent } from './drupal-bridge/movie-box/movie-box.component';
import { ImageComponent } from './drupal-bridge/image/image.component';
import { SvgColorTableComponent } from './drupal-bridge/svg-color-table/svg-color-table.component';
import { SearchComponent } from './drupal-bridge/search/search.component';
import { isPlatformBrowser } from '@angular/common';
import { YoutubeComponent } from './drupal-bridge/youtube/youtube.component';

/**
 * The root component for the application.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'app';
  // import Angulartics2GoogleGlobalSiteTag in root component
  constructor(@Inject(PLATFORM_ID) private platform: Object, injector: Injector) {
    // Start tracking
    // angulartics.startTracking();

    const registerElement = (tagName: string, component: any) => {
      // Convert component to a custom element.
      const element = createCustomElement(component, {injector});
      // Register the custom element with the browser.
      customElements.define(tagName, element);
    };

    if (isPlatformBrowser(this.platform)) {
      // Register angular elements for CMS content
      registerElement('apike-gallery', GalleryComponent);
      registerElement('apike-image', ImageComponent);
      registerElement('apike-moviebox', MovieBoxComponent);
      registerElement('apike-search', SearchComponent);
      registerElement('apike-svg-colortable', SvgColorTableComponent);
      registerElement('apike-youtube', YoutubeComponent);
    }
  }
}
