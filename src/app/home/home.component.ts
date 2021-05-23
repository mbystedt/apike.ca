import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NodePaginateService } from '../service/node-paginate/node-paginate.service';
import { PageTitleService } from '../service/page-title/page-title.service';
import { Uid } from '../service/drupal-bridge/drupal-bridge.service';
import { TagHelperService } from '../service/tag-helper/tag-helper.service';

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
  public loading = false;

  public results: any = [];
  public tag: Uid | null = null;

  constructor(
    private nodePaginate: NodePaginateService,
    private route: ActivatedRoute,
    private router: Router,
    private title: PageTitleService,
    private tagHelper: TagHelperService) { }

  public ngOnInit(): void {

    this.nodePaginate$ = combineLatest([this.route.queryParamMap, this.route.paramMap]).pipe(
      switchMap(([queryParams, params]: ParamMap[]) => {
        // (+) before `params.get()` turns the string into a number
        const qIndex = queryParams.get('index');
        const qPageSize = queryParams.get('pageSize');
        this.index = qIndex ? +qIndex : 0;
        this.pageSize = qPageSize ? +qPageSize : 10;
        this.loading = true;
        this.tagName = params.has('name') ? params.get('name') : null;
        if (this.tagName) {
          // Necessary because Drupal inexplicably doesn't include this.
          const tagId = this.tagHelper.tagToId(this.tagName);
          this.tag = this.tagHelper.idToMockUid(tagId ? tagId : 1);
          this.title.setTitle(`Tag ${this.tagName}`);
        } else {
          this.title.setTitle('Home');
        }
        return this.nodePaginate.get(this.tagName, this.index, this.pageSize);
      })
    );

    this.nodePaginate$.subscribe((res) => {
      this.length = res.pager.total_items;
      this.pageSize = res.pager.items_per_page;
      this.index = res.pager.current_page;

      this.results = res.results;

      this.loading = false;
    });
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
      }
    };
    this.router.navigate([this.tagName ? `tags/${this.tagName}` :  ''], navigationExtras);
  }
}
