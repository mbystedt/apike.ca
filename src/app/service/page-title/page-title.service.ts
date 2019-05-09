import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Wraps the angular title service to provide an application specific title.
 */
@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor(private titleService: Title) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( `${newTitle} | apike.ca | Science, Technology, Programming and Anime` );
  }
}
