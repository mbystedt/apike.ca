import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeUser } from '../service/drupal-bridge/drupal-bridge.service';
import { PageTitleService } from '../service/page-title/page-title.service';

/**
 * The bridge component uses the data fetched from drupal to display a
 * page of content.
 */
@Component({
  selector: 'app-drupal-bridge',
  templateUrl: './drupal-bridge.component.html',
  styleUrls: ['./drupal-bridge.component.css']
})
export class DrupalBridgeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private title: PageTitleService) { }

  public body = '';
  public tag: any;
  public pageTitle: any;
  public username: any;
  public creationDate: any;

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.route.data
      .subscribe((data: any) => {
        this.body = data.node.node.body[0].processed;

        if (data.node.node.field_tags && data.node.node.field_tags[0]) {
          this.tag = data.node.node.field_tags[0];
        } else {
          this.tag = undefined;
        }
        this.pageTitle = data.node.node.title[0].value;
        // Set page's title
        this.title.setTitle(this.pageTitle);

        this.username = data.node.user;
        this.creationDate = data.node.node.changed[0].value;
      });
  }
}
