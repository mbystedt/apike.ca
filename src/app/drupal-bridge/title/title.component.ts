import { Component, Input } from '@angular/core';

/**
 * This component displays the page title.
 */
@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css'],
    standalone: false
})
export class TitleComponent {

  @Input()
  public title!: string;
}
