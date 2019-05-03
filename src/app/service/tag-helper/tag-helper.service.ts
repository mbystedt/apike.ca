import { Injectable } from '@angular/core';
import { Uid } from '../drupal-bridge/drupal-bridge.service';



const tagToId = {
  anime: 1,
  programming: 2,
  announcements: 3,
  design: 4,
  science: 5,
  apple: 6,
};

const idToName = {
  1: 'Anime',
  2: 'Programming',
  3: 'Announcements',
  4: 'Design',
  5: 'Science',
  6: 'Apple'
};

const idToUrl = {
  1: 'tags/anime',
  2: 'tags/programming',
  3: 'tags/announcements',
  4: 'tags/design',
  5: 'tags/science',
  6: 'tags/apple'
};

@Injectable({
  providedIn: 'root'
})
export class TagHelperService {

  constructor() { }

  public tagToId(tag: string): number {
    return tag in tagToId ? tagToId[tag] : null;
  }

  public idToName(tagId: number): string {
    return tagId in idToName ? idToName[tagId] : 'Unknown';
  }

  public idToUrl(tagId: number): string {
    return tagId in idToUrl ? idToUrl[tagId] : '';
  }

  public idToMockUid(tagId: number): Uid {
    return {
      target_id: tagId,
      url: this.idToUrl(tagId),
      target_type: '',
      target_uuid: ''
    };
  }
}
