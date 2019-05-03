import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NodePaginateService } from '../service/node-paginate/node-paginate.service';
import { PageTitleService } from '../service/page-title/page-title.service';
import { Uid } from '../service/drupal-bridge/drupal-bridge.service';
import { TagHelperService } from '../service/tag-helper/tag-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nodePaginate$: Observable<any>;
  public pager: any;
  public length: number;
  public pageSize: number;
  public index: number;
  public tagName: string;
  public pageSizeOptions = [5, 10, 20, 40];
  public loading: boolean = false;

  public results = [];
  public tag: Uid;

  constructor(
    private nodePaginate: NodePaginateService,
    private route: ActivatedRoute,
    private router: Router,
    private title: PageTitleService,
    private tagHelper: TagHelperService) { }
  
  public ngOnInit(): void {

    this.nodePaginate$ = combineLatest(this.route.queryParamMap, this.route.paramMap).pipe(
      switchMap(([queryParams, params]: ParamMap[]) => {
        // (+) before `params.get()` turns the string into a number
        this.index = queryParams.has('index') ? +queryParams.get('index') : 0;
        this.pageSize = queryParams.has('pageSize') ? +queryParams.get('pageSize') : 10;
        this.loading = true;
        this.tagName = params.has('name') ?  params.get('name') : null;
        if (this.tagName) {
          this.tag = this.tagHelper.idToMockUid(this.tagHelper.tagToId(this.tagName));
          this.title.setTitle(`Tag ${this.tagName}`);
        } else {
          this.title.setTitle('Home');
        }
        return this.nodePaginate.get(this.tagName, this.index, this.pageSize);
      })
    );

    this.nodePaginate$.subscribe((res) => {
      // console.log(res.pager);

      this.length = res.pager.total_items;
      this.pageSize = res.pager.items_per_page;
      this.index = res.pager.current_page;

      this.results = res.results;

      this.loading = false;
    });
  }

  public onPageEvent(event) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pageSize: event.pageSize,
        index: event.pageIndex
      } 
    }
    this.router.navigate([this.tagName ? `tags/${this.tagName}` :  ''], navigationExtras);
  }
}
