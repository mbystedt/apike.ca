import { Pipe, PipeTransform } from '@angular/core';

import { UrlUtil } from '../drupal-bridge/shared/url-util';

@Pipe({ name: 'drupalUrl' })
export class DrupalUrlPipe implements PipeTransform {
  transform(url: string) {
    return UrlUtil.removeNodeUrl(url);
  }
}
