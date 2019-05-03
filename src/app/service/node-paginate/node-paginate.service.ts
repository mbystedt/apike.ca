import { Injectable } from '@angular/core';
import { Observable }             from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { TagHelperService } from '../tag-helper/tag-helper.service';

interface PagedNode {

}

interface Pager {
  current_page: number;
  items_per_page: number;
  total_items: number;
}

interface PagedResults {
  results: PagedNode[];
  pager: Pager;
}

@Injectable({
  providedIn: 'root'
})
export class NodePaginateService {
  private nodeUrl = '/drupal'

  constructor(private http: HttpClient, private tagHelper: TagHelperService) { }

  public get(tag: string, pageIndex: number, pageSize: number): Observable<PagedResults> {
    const options = {
      params: new HttpParams()
        .set('_format', 'json')
        .set('page', pageIndex.toString())
        .set('items_per_page', pageSize.toString())
    };
    return this.http.get<PagedResults>(`${this.nodeUrl}/api/${this.tagToUrl(tag)}`, options);
  }

  private tagToUrl(tag: string): string {
    if (tag === null) {
      return 'frontpage';
    } else {
      return `taxonomy/term/${this.tagHelper.tagToId(tag)}`;
    }
  }
}
