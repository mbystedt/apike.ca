import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { GalleryValue } from '../../service/drupal-bridge/drupal-bridge.service';
import { ImageUtil } from '../shared/image-util';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];

  constructor() { }

  public ngOnInit(): void {
    this.galleryOptions = [
      {
          width: '760px',
          height: '420px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          imageSize: 'contain'
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];
  }

  public setImages(images: GalleryValue[]): void {

    this.galleryImages = images.map((img) => {
      return {
        small: img.url,
        medium: img.url,
        big: img.url,
        description: ImageUtil.parseDescription(img).description
      };
    });
  }
}
