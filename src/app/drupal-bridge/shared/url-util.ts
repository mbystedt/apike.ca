
export const NODE_URL = '/drupal';

export class UrlUtil {
  public static removeNodeUrl(url: string): string {
    if (url.slice(0, 7) === NODE_URL) {
      return url.slice(7);
    }
    return url;
  }
}
