import { Component, OnInit } from '@angular/core';

/**
 * The movie box component displays the data inside the tag.
 */
@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {
  public data: any = {};

  constructor() { }

  ngOnInit() {
  }

  public setData(data: any) {
    this.data = data;
  }

}
