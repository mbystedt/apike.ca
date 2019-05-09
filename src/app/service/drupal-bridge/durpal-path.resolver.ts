import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';

import { NodeUser, DrupalBridgeService } from './drupal-bridge.service';
import { NodeUserService } from '../node-user/node-user.service';

@Injectable()
export class DrupalPathResolver implements Resolve<NodeUser> {
  constructor(private drupalBridgeService: DrupalBridgeService, private router: Router, private nodeUserServ: NodeUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NodeUser> {
    const path: string = route.url.join('/');

    return this.drupalBridgeService.getNodeByPath(path).pipe(
      flatMap((node) => {
        return forkJoin([of(node), this.drupalBridgeService.getUserByUid(node.uid[0])]).pipe(
          map ((data) => {
            this.nodeUserServ.value = {
              node: data[0],
              user: data[1]
            };
            return this.nodeUserServ.value;
          }
        )
        );
      }),
      map(nodeUser => {
        if (nodeUser) {
          this.nodeUserServ.value = nodeUser;
          return nodeUser;
        } else { // path not found
          this.router.navigate(['/not-found']);
          this.nodeUserServ.value = null;
          return null;
        }
      }),
      catchError((err: any, caught) => {
        this.router.navigate(['/not-found']);
        this.nodeUserServ.value = null;
        return of(null);
      })
    );
  }
}