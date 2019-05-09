import { Component, OnInit, Input } from '@angular/core';
import { GalleryValue } from '../../service/drupal-bridge/drupal-bridge.service';
import { ImageUtil } from '../shared/image-util';
import { NodeUserService } from 'src/app/service/node-user/node-user.service';

/**
 * The image component displays the node's image, an image from the node's
 * gallery or any image on the internet.
 */
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  /**
   * The source of the image.
   * If blank display the node's 'field_image'
   * If the end of the url of an image node's 'field_gallery' matches then display it.
   * If none of the above is applicable, display as-is.
   */
  @Input() public src: string;
  /** The images's alt string. */
  @Input() public alt: string;
  /** Boolean to hide the image divider style. */
  @Input() public hideDivider: string;
  /** The image to display. */
  public image: any;
  /** The text shown under the image. Grabbed from drupal data if avialable. Otherwise, uses alt. */
  public text: string;

  constructor(private nodeUserServ: NodeUserService) { }

  public ngOnInit(): void {
    if (this.src !== undefined) {
      const imageSrc: GalleryValue[] = this.nodeUserServ.value.node.field_gallery;
      this.image = imageSrc.find((image) => {
        return image.url.endsWith(this.src);
      });
    } else {
      const imageSrc: GalleryValue[] = this.nodeUserServ.value.node.field_image;
      this.image = imageSrc[0];
    }
    if (this.image) {
      this.text = ImageUtil.parseDescription(this.image).description;
    } else {
      this.image = {
        url: this.src
      };
      this.text = this.alt;
    }
  }
}
