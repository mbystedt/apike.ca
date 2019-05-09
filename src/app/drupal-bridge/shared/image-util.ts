import { GalleryValue } from '../../service/drupal-bridge/drupal-bridge.service';

export class ImageUtil {
  /**
   * Parses a drupal gallery image to generate a textual description.
   * @param image The image to parse.
   * @returns The text for the image.
   */
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

  /**
   * Expands the credit string if matches a shortened value.
   * @param credit The credit string.
   * @returns The expanded credit string.
   */
  private static parseCredit(credit: string): string {
    return credit === 'mb' ? 'Matthew Bystedt' : credit;
  }
}
