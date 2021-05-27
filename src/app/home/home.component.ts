import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageTitleService } from '../service/page-title/page-title.service';
import { Uid } from '../service/drupal-bridge/drupal-bridge.service';

/**
 * The 'home' component displays the paginated content from drupal. It's
 * used for all paginated content like tags and the home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nodePaginate$: Observable<any> | undefined;
  public pager: any;
  public length: number | undefined;
  public pageSize: number | undefined;
  public index: number | undefined;
  public tagName: string | null = null;
  public pageSizeOptions = [5, 10, 20, 40];

  public results: any = [];
  public tag: Uid | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: PageTitleService) { }

  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Handles navigating to tags.
   * @param event The event to handle.
   */
  public onPageEvent(event: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pageSize: event.pageSize,
        index: event.pageIndex
      },
      skipLocationChange: false
    };
    this.router.navigate([this.tagName ? `tags/${this.tagName}` :  ''], navigationExtras);
  }

  private loadData(): void {
    this.route.data
      .subscribe((data: any) => {
        this.tagName = data.node.tagName;
        this.tag = data.node.tag;
        this.title.setTitle(data.node.title);
        this.results = data.node.results.results;

        this.length = data.node.results.pager.total_items;
        this.pageSize = data.node.results.pager.items_per_page;
        this.index = data.node.results.pager.current_page;
      });
  }
}
