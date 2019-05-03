import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of as observableOf, forkJoin }             from 'rxjs';
import { map, flatMap, catchError }              from 'rxjs/operators';
 
import { NodeUser, DrupalBridgeService } from './drupal-bridge.service';
 
@Injectable()
export class DrupalPathResolver implements Resolve<NodeUser> {
  constructor(private drupalBridgeService: DrupalBridgeService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NodeUser> {
    let path: string = route.url.join('/');
 
    return this.drupalBridgeService.getNodeByPath(path).pipe(
      flatMap((node) => {
        return forkJoin(observableOf(node), this.drupalBridgeService.getUserByUid(node.uid[0])).pipe(
          map ((data) => {
            return {
              node: data[0],
              user: data[1]
            }

          }
        )
        );
      }),
      map(node => {
        if (node) {
          return node;
        } else { // path not found
          this.router.navigate(['/not-found']);
          return null;
        }
      }),
      catchError((err: any, caught) => {
        this.router.navigate(['/not-found']);
        return observableOf(null);
      })
    );
  }
}