import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { Angulartics2Module } from 'angulartics2';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DrupalBridgeComponent } from './drupal-bridge/drupal-bridge.component';
import { GalleryComponent } from './drupal-bridge/gallery/gallery.component';
import { ImageComponent } from './drupal-bridge/image/image.component';
import { MovieBoxComponent } from './drupal-bridge/movie-box/movie-box.component';
import { RawHtmlComponent } from './drupal-bridge/raw-html/raw-html.component';
import { TitleComponent } from './drupal-bridge/title/title.component';
import { UserDisplayComponent } from './drupal-bridge/user-display/user-display.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './drupal-bridge/search/search.component';
import { SvgColorTableComponent } from './drupal-bridge/svg-color-table/svg-color-table.component';
import { TagHeaderComponent } from './drupal-bridge/tag-header/tag-header.component';
import { DrupalUrlPipe } from './shared/drupal-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DrupalBridgeComponent,
    NotFoundComponent,
    RawHtmlComponent,
    TitleComponent,
    UserDisplayComponent,
    GalleryComponent,
    MovieBoxComponent,
    SearchComponent,
    SvgColorTableComponent,
    TagHeaderComponent,
    ImageComponent,
    HomeComponent,
    DrupalUrlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGalleryModule,
    Angulartics2Module.forRoot()
  ],
  entryComponents: [
    GalleryComponent,
    ImageComponent,
    MovieBoxComponent,
    RawHtmlComponent,
    TagHeaderComponent,
    TitleComponent,
    UserDisplayComponent,
    SearchComponent,
    SvgColorTableComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
