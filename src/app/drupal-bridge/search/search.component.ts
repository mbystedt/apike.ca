import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * The search bridge component displays a google search box on the page.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  public body: SafeHtml = '';

  ngOnInit() {
    this.body = this.sanitizer.bypassSecurityTrustHtml('<gcse:search></gcse:search>');
    const cx = 'partner-pub-1517885989558789:5447511183';
    const gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    const s = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(gcse, s);
  }
}
