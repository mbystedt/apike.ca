import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UrlUtil } from '../shared/url-util';

/**
 * The raw html bridge component passes the text through as the innerHTML property of a div tag.
 * It processes 'a' tags with href properties into router links. The 'a' tag must specifically
 * start with the exact string 'a href' to trigger this. All clicks to the container div are inspected
 * for router links and router navigation is triggered programmatically to avoid reloading the page.
 * Note: The passed in HTML is assumed to come from a trusted source.
 */
@Component({
  selector: 'app-raw-html',
  templateUrl: './raw-html.component.html',
  styleUrls: ['./raw-html.component.css']
})
export class RawHtmlComponent implements OnInit {

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  @Input('body')
  set body(body: string) {
    this.safeBody = this.sanitizer.bypassSecurityTrustHtml(this.processHtml(body));
  }

  public safeBody: SafeHtml = '';

  public ngOnInit(): void { }

  /**
   * Handles click events on links so that the application runs as a SPA.
   * @param event The click event to look at.
   */
  public onClick(event: any): void {
    // Check DOM heirachy for router-href attribute
    for (let elem = event.srcElement; elem !== null; elem = elem.parentElement) {
      if (elem.attributes && elem.attributes['router-href']) {
        // Navigate to the the url within the SPA
        this.router.navigateByUrl(elem.attributes['router-href'].value);
      }
    }
    event.stopPropagation();
  }

  private processHtml(data: string): string {
    const strArr = [];
    for (let startIndex = 0; startIndex >= 0;) {
      const [str, index] = this.processHtmlStep(data, startIndex);
      strArr.push(str);
      startIndex = index;
    }
    return strArr.join('');
  }

  private processHtmlStep(data: string, startIndex: number): [string, number] {
    for (;;) {
      const startHrefIndex = data.indexOf('a href="', startIndex);
      if (startHrefIndex === -1) {
        return [data.substring(startIndex), -1];
      }
      const endHrefIndex = data.indexOf('"', startHrefIndex + 8);
      const hrefStr = data.substring(startHrefIndex + 8, endHrefIndex);

      if (hrefStr.startsWith('http')) {
        return [data.substring(startIndex, endHrefIndex + 1), endHrefIndex + 1];
      } else {
        return [[data.substring(startIndex, startHrefIndex), 'a router-href="',
          UrlUtil.removeNodeUrl(hrefStr), '"'].join(''), endHrefIndex + 1];
      }
    }
  }
}
