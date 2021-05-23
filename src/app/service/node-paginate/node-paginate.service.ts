import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { TagHelperService } from '../tag-helper/tag-helper.service';
import { DRUPAL_URL } from 'src/app/shared/constants';

// tslint:disable-next-line: no-empty-interface
interface PagedNode {
  // Maybe when I have a free year or two?
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

/**
 * Service for calling Drupal APIs for pages of nodes.
 */
@Injectable({
  providedIn: 'root'
})
export class NodePaginateService {

  constructor(private http: HttpClient, private tagHelper: TagHelperService) { }

  /**
   * Gets a array of nodes from Drupal.
   * @param tag Limit results to this tag. If null, return frontpage results.
   * @param pageIndex The starting index or offset.
   * @param pageSize The maximum number of nodes to return.
   */
  public get(tag: string | null, pageIndex: number, pageSize: number): Observable<PagedResults> {
    const options = {
      params: new HttpParams()
        .set('_format', 'json')
        .set('page', pageIndex.toString())
        .set('items_per_page', pageSize.toString())
    };
    return this.http.get<PagedResults>(`${DRUPAL_URL}/api/${this.tagToUrl(tag)}`, options);
  }

  private tagToUrl(tag: string | null): string {
    if (tag === null) {
      return 'frontpage';
    } else {
      return `taxonomy/term/${this.tagHelper.tagToId(tag)}`;
    }
  }
}
