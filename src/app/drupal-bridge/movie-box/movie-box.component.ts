import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

/**
 * The movie box component displays the data parsed from the data attribute.
 */
@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {
  @Input()
  get data() {
    return JSON.parse(this._data);
  }
  set data(data) {
    this._data = data;
  }

  private _data = '{}';

  constructor() { }

  ngOnInit() { }
}
