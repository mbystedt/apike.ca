import { Component, Input } from '@angular/core';

/**
 * The movie box component displays the data parsed from the data attribute.
 */
@Component({
    selector: 'app-movie-box',
    templateUrl: './movie-box.component.html',
    styleUrls: ['./movie-box.component.css'],
    standalone: false
})
export class MovieBoxComponent {
  @Input()
  get data() {
    return JSON.parse(this._data);
  }
  set data(data) {
    this._data = data;
  }

  private _data = '{}';
}
