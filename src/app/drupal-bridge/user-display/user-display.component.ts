import { Component, Input } from '@angular/core';

/**
 * This component displays user by-line.
 */
@Component({
    selector: 'app-user-display',
    templateUrl: './user-display.component.html',
    styleUrls: ['./user-display.component.css'],
    standalone: false
})
export class UserDisplayComponent {

  @Input()
  public user!: any;
  @Input()
  public date!: string;
}
