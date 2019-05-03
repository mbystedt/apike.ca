import { GalleryValue } from '../../service/drupal-bridge/drupal-bridge.service';

export class ImageUtil {
  public static parseDescription(image: GalleryValue) {

    const metaIndex = image.alt.indexOf('/');
    const text = image.alt.substring(metaIndex + 1).trim();
    const credit = this.parseCredit(image.alt.substring(0, metaIndex).trim());
    const description = credit !== '' ? `${text} (${credit})` : text;

    return {
      credit,
      description,
      text
    };
  }

  private static parseCredit(credit: string): string {
    return credit === 'mb' ? 'Matthew Bystedt' : credit;
  }
}
