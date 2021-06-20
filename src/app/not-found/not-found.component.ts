import { Component, OnInit, Inject, Optional } from '@angular/core';
import { PageTitleService } from '../service/page-title/page-title.service';
import { Response } from 'express';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

/**
 * This component is displayed when the page to navigate to is not found.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private title: PageTitleService,
    @Optional() @Inject(RESPONSE) private response: Response) { }

  ngOnInit() {
    this.title.setTitle('404 - Not Found');
    if (this.response) {
      // response will only be if we have express
      // this.response.statusCode = 404;
      this.response.status(404);
    }
  }

}
