import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { DRUPAL_URL, HOST_URL } from 'src/app/shared/constants';

interface StringValue {
  value: string;
}

interface BooleanValue {
  value: boolean;
}

interface NumberValue {
  value: number;
}

interface DateValue {
  value: string;
  format: string;
}

interface BodyValue {
  format: string;
  processed: string;
  summary: string;
  value: string;
}

interface Path {
  alias: string;
  pid: number;
  langcode: string;
}

export interface Uid {
  target_id: number;
  target_type: string;
  target_uuid: string;
  url: string;
}

export interface GalleryValue extends Uid {
  alt: string;
  height: number;
  title: string;
  url: string;
  width: number;
}

export interface Node {
  body: BodyValue[];
  changed: DateValue[];
  created: DateValue[];
  default_langcode: BooleanValue[];
  field_image: GalleryValue[];
  field_gallery: GalleryValue[];
  field_tags: Uid[];
  langcode: StringValue[];
  nide: StringValue[];
  path: Path[];
  promote: BooleanValue[];
  revision_log: any;
  revision_timestamp: DateValue[];
  revision_translation_affected: BooleanValue[];
  revision_uid: Uid[];
  status: BooleanValue[];
  sticky: BooleanValue[];
  title: StringValue[];
  type: Uid[];
  uid: Uid[];
  uuid: StringValue;
  vid: NumberValue;
}

export interface User {
  access: DateValue[];
  changed: DateValue[];
  created: DateValue[];
  default_langcode: BooleanValue[];
  init: StringValue[];
  langcode: StringValue[];
  login: DateValue[];
  mail: StringValue[];
  name: StringValue[];
  preferred_admin_langcode: StringValue[];
  preferred_langcode: StringValue[];
  roles: Uid[];
  status: BooleanValue[];
  timezone: StringValue[];
  uid: StringValue[];
  user_picture: StringValue[];
  uuid: StringValue[];
}

export interface NodeUser {
  node: Node;
  user: User;
}

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class DrupalBridgeService {

  private nodeUrl = DRUPAL_URL;
  private userUidCache$: { [index: string]: Observable<User> } = {};

  constructor(private http: HttpClient) { }

  public getNodeById(id: string): Observable<Node> {
    const options = {
      params: new HttpParams().set('_format', 'json')
    };
    return this.http.get<Node>(`${HOST_URL}${this.nodeUrl}/node/${id}`, options);
  }

  public getNodeByPath(path: string): Observable<Node> {
    const options = {
      params: new HttpParams().set('_format', 'json')
    };
    return this.http.get<Node>(`${HOST_URL}${this.removeDuplication(`${this.nodeUrl}/${path}`)}`, options);
  }

  public getUserById(id: string): Observable<User> {
    const options = {
      params: new HttpParams().set('_format', 'json')
    };
    return this.http.get<User>(`${HOST_URL}${this.nodeUrl}/user/${id}`, options);
  }

  public getUserByUid(uid: Uid): Observable<User> {
    const hash: string = uid.url;
    if (!this.userUidCache$[hash]) {
      this.userUidCache$[hash] = this.requestUserByUid(uid)
        .pipe(
          shareReplay(CACHE_SIZE)
        );
    }

    return this.userUidCache$[hash];
  }

  private requestUserByUid(uid: Uid): Observable<User> {
    const options = {
      params: new HttpParams().set('_format', 'json')
    };
    return this.http.get<User>(`${HOST_URL}${this.removeDuplication(`${this.nodeUrl}${uid.url}`)}`, options);
  }

  private removeDuplication(url: string) {
    if (url.slice(7, 14) === this.nodeUrl) {
      return url.slice(7);
    }
    return url;
  }
}
