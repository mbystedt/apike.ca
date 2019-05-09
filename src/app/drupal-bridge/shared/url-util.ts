import { DRUPAL_URL } from 'src/app/shared/constants';

export class UrlUtil {
  /**
   * The path to drupal needs to be removed as drupal returns links with its path in it.
   * The SPA, however, is hosted at a different path.
   * @param url The url to remove the drupal part from.
   * @returns The sanitized url.
   */
  public static removeNodeUrl(url: string): string {
    if (url.slice(0, 7) === DRUPAL_URL) {
      return url.slice(7);
    }
    return url;
  }
}
