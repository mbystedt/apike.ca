import { Component, OnInit } from '@angular/core';
import { GalleryValue } from '../../service/drupal-bridge/drupal-bridge.service';
import { ImageUtil } from '../shared/image-util';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  public data: any;
  public image: any;
  public text: string;
  public hideDivider: boolean = false;
  private images: GalleryValue[];

  constructor() { }

  public ngOnInit(): void {
    this.image = this.images.find((image) => {
      return image.url.endsWith(this.data.image);
    });
    if (this.image) {
      this.text = ImageUtil.parseDescription(this.image).description;
    } else {
      this.image = {
        url: this.data.image
      }
      this.text = this.data.alt;
    }
    this.hideDivider = !!this.data.hideDivider;
  }

  public setData(data: any): void {
    this.data = data;
  }

  public setImages(images: GalleryValue[]): void {
    this.images = images;
  }
}
