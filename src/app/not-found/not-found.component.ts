import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title/page-title.service';

/**
 * This component is displayed when the page to navigate to is not found.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private title: PageTitleService) { }

  ngOnInit() {
    this.title.setTitle('404 - Not Found');
  }

}
