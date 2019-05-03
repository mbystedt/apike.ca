import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrupalBridgeService, NodeUser } from '../service/drupal-bridge/drupal-bridge.service';
import { BridgeHostDirective } from '../shared/bridge-host.directive';
import { RawHtmlComponent } from './raw-html/raw-html.component';
import { TitleComponent } from './title/title.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './image/image.component';
import { MovieBoxComponent } from './movie-box/movie-box.component';
import { SearchComponent } from './search/search.component';
import { SvgColorTableComponent } from './svg-color-table/svg-color-table.component';
import { TagHeaderComponent } from './tag-header/tag-header.component';
import { PageTitleService } from '../service/page-title/page-title.service';

/**
 * The bridge component dynamically creates components
 * based on the tags in the data.
 */
@Component({
  selector: 'app-drupal-bridge',
  templateUrl: './drupal-bridge.component.html',
  styleUrls: ['./drupal-bridge.component.css']
})
export class DrupalBridgeComponent implements OnInit {

  @ViewChild(BridgeHostDirective) private host: BridgeHostDirective;

  constructor(
    private drupalBridgeService: DrupalBridgeService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private title: PageTitleService) { }

  public user: any;

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.route.data
      .subscribe((data: { node: NodeUser }) => {
        // console.log(data);
        this.user = data.node.user;
        this.buildComponents(data.node);
      });
  }

  private buildComponents(nodeUser: NodeUser) {
    const tagHeaderFactory = this.componentFactoryResolver.resolveComponentFactory(TagHeaderComponent);
    const titleFactory = this.componentFactoryResolver.resolveComponentFactory(TitleComponent);
    const userDisplayFactory = this.componentFactoryResolver.resolveComponentFactory(UserDisplayComponent);
    const rawHtmlFactory = this.componentFactoryResolver.resolveComponentFactory(RawHtmlComponent);
    const galleryFactory = this.componentFactoryResolver.resolveComponentFactory(GalleryComponent);
    const imageFactory = this.componentFactoryResolver.resolveComponentFactory(ImageComponent);
    const movieBoxFactory = this.componentFactoryResolver.resolveComponentFactory(MovieBoxComponent);
    const searchFactory = this.componentFactoryResolver.resolveComponentFactory(SearchComponent);
    const svgColorTableFactory = this.componentFactoryResolver.resolveComponentFactory(SvgColorTableComponent);

    const viewContainerRef = this.host.viewContainerRef;

    viewContainerRef.clear();

    if (nodeUser.node.field_tags && nodeUser.node.field_tags[0]) {
      const tagHeaderRef = viewContainerRef.createComponent(tagHeaderFactory);
      (<TagHeaderComponent>tagHeaderRef.instance).tag = nodeUser.node.field_tags[0];

    }

    const titleRef = viewContainerRef.createComponent(titleFactory);
    const pageTitle = nodeUser.node.title[0].value;
    (<TitleComponent>titleRef.instance).title = pageTitle;
    this.title.setTitle(pageTitle);

    const userDisplayRef = viewContainerRef.createComponent(userDisplayFactory);
    (<UserDisplayComponent>userDisplayRef.instance).user = nodeUser.user;
    (<UserDisplayComponent>userDisplayRef.instance).date = nodeUser.node.changed[0].value;

    for (const compInfo of this.processHtmlStep(nodeUser.node.body[0].processed)) {
      // console.log(compInfo);

      if (compInfo.type === 'raw' && compInfo.data.trim() !== '') {
        const componentRef = viewContainerRef.createComponent(rawHtmlFactory);
        (<RawHtmlComponent>componentRef.instance).setData(compInfo.data);
      } else if (compInfo.type === 'gallery') {
        const componentRef = viewContainerRef.createComponent(galleryFactory);
        (<GalleryComponent>componentRef.instance).setImages(nodeUser.node.field_gallery);
      } else if (compInfo.type === 'image') {
        const componentRef = viewContainerRef.createComponent(imageFactory);
        const data = compInfo.data !== '' ? JSON.parse(compInfo.data) : {};
        if (!data.image) {
          data.image = nodeUser.node.field_image[0].url;
          (<ImageComponent>componentRef.instance).setData(data);
          (<ImageComponent>componentRef.instance).setImages(nodeUser.node.field_image);
        } else {
          (<ImageComponent>componentRef.instance).setData(data);
          (<ImageComponent>componentRef.instance).setImages(nodeUser.node.field_gallery);
        }
      } else if (compInfo.type === 'moviebox') {
        const componentRef = viewContainerRef.createComponent(movieBoxFactory);
        (<MovieBoxComponent>componentRef.instance).setData(JSON.parse(compInfo.data));
      } else if (compInfo.type === 'search') {
        const componentRef = viewContainerRef.createComponent(searchFactory);
      } else if (compInfo.type === 'svg-colortable') {
        const componentRef = viewContainerRef.createComponent(svgColorTableFactory);
      }
    }
  }

  private *processHtmlStep(data: string): IterableIterator<any> {
    let startIndex = 0;
    for (;;) {
      const openTagStartIndex = data.indexOf('<apike-', startIndex);
      if (openTagStartIndex === -1) {
        const rawHtml = data.substring(startIndex);
        yield {
          type: 'raw',
          data: rawHtml
        };
        break;
      }
      if (openTagStartIndex > startIndex) {
        const rawHtml = data.substring(startIndex, openTagStartIndex);
        yield {
          type: 'raw',
          data: rawHtml
        };
      }
      const openTagEndIndex = data.indexOf('>', openTagStartIndex + 7);
      const tagStr = data.substring(openTagStartIndex + 7, openTagEndIndex);
      const closeTagStartIndex = data.indexOf(`</apike-${tagStr}>`, openTagStartIndex);
      const dataStr = data.substring(openTagStartIndex + tagStr.length + 8, closeTagStartIndex);

      yield {
        type: tagStr,
        data: dataStr
      };

      startIndex = closeTagStartIndex + tagStr.length + 9;
    }
  }

}
