import { Component, OnInit, Input } from '@angular/core';

/**
 * This component displays the page title.
 */
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input()
  public title: string;

  constructor() { }

  public ngOnInit(): void {
  }

}
