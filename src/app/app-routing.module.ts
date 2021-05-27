import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrupalBridgeComponent } from './drupal-bridge/drupal-bridge.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DrupalPathResolver } from './service/drupal-bridge/durpal-path.resolver';
import { HomeComponent } from './home/home.component';
import { NodePaginateResolver } from './service/node-paginate/node-paginate.resolver';

export const appRoutes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'not-found', component: NotFoundComponent },
      { path: 'tags/:name',
        component: HomeComponent,
        resolve: {
          node: NodePaginateResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      { path: '',
        component: HomeComponent,
        resolve: {
          node: NodePaginateResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      { path: '**',
        component: DrupalBridgeComponent,
        resolve: {
          node: DrupalPathResolver
        }
      }
    ]
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
    ],
    exports: [
      RouterModule
    ],
    providers: [
      DrupalPathResolver,
      NodePaginateResolver
    ]
  })
  export class AppRoutingModule {}
