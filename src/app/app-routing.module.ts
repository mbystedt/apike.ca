import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrupalBridgeComponent } from './drupal-bridge/drupal-bridge.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DrupalPathResolver } from './service/drupal-bridge/durpal-path.resolver';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'not-found', component: NotFoundComponent },
      { path: 'tags/:name', component: HomeComponent },
      { path: '', component: HomeComponent },
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
      DrupalPathResolver
    ]
  })
  export class AppRoutingModule {}
