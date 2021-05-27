import { Injectable } from '@angular/core';
import { Uid } from '../drupal-bridge/drupal-bridge.service';

// These can be hardcoded because the site doesn't do dynamic tagging.
const tagToId: {
  [key: string]: number;
} = {
  anime: 1,
  programming: 2,
  announcements: 3,
  design: 4,
  science: 5,
  apple: 6,
};

const idToName: {
  [key: number]: string;
} = {
  1: 'Anime',
  2: 'Programming',
  3: 'Announcements',
  4: 'Design',
  5: 'Science',
  6: 'Apple'
};

const idToUrl: {
  [key: number]: string;
} = {
  1: '/tags/anime',
  2: '/tags/programming',
  3: '/tags/announcements',
  4: '/tags/design',
  5: '/tags/science',
  6: '/tags/apple'
};

@Injectable({
  providedIn: 'root'
})
export class TagHelperService {

  constructor() { }

  /**
   * Transforms a tag name to an id.
   * @param tag The name of the tag.
   * @returns The id of the tag.
   */
  public tagToId(tag: string): number | null {
    return tag in tagToId ? tagToId[tag] : null;
  }

  /**
   * Transforms a tag id to a name.
   * @param tagId The id of the tag.
   * @returns The name of the tag.
   */
  public idToName(tagId: number): string {
    return tagId in idToName ? idToName[tagId] : 'Unknown';
  }

  /**
   * Transforms a tag id to a url.
   * @param tagId The id of the tag.
   * @returns The url of the tag.
   */
  public idToUrl(tagId: number): string {
    return tagId in idToUrl ? idToUrl[tagId] : '';
  }

  /**
   * Creates a mock Drupal structure.
   * @param tagId The id of the tag.
   * @returns A mock uid structure for the tag.
   */
  public idToMockUid(tagId: number): Uid {
    return {
      target_id: tagId,
      url: this.idToUrl(tagId),
      target_type: '',
      target_uuid: ''
    };
  }
}
