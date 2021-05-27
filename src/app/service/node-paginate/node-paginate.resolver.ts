import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { NodePaginateService } from './node-paginate.service';
import { TagHelperService } from '../tag-helper/tag-helper.service';
import { Uid } from '../drupal-bridge/drupal-bridge.service';

@Injectable()
export class NodePaginateResolver implements Resolve<any> {
  constructor(private nodePaginate: NodePaginateService, private router: Router, private tagHelper: TagHelperService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const queryParams = route.queryParamMap;
    const params = route.paramMap;
    const qIndex = queryParams.get('index');
    const qPageSize = queryParams.get('pageSize');
    const index = qIndex ? +qIndex : 0;
    const pageSize = qPageSize ? +qPageSize : 10;
    const tagName = params.has('name') ? params.get('name') : null;
    let title = 'Home';
    let tag: Uid | null = null;

    if (tagName) {
      // Necessary because Drupal inexplicably doesn't include this.
      const tagId = this.tagHelper.tagToId(tagName);
      tag = this.tagHelper.idToMockUid(tagId ? tagId : 1);
      title = `Tag ${tagName}`;
    }
    return this.nodePaginate.get(tagName, index, pageSize).pipe(
      map(results => ({
        tagName,
        tag,
        title,
        results
      })),
      catchError((err: any, caught) => {
        console.log(err);
        this.router.navigate(['/not-found']);
        return of(null);
      })
    );
  }
}
