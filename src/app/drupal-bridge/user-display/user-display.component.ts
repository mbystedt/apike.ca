import { Component, OnInit, Input } from '@angular/core';

/**
 * This component displays user by-line.
 */
@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input()
  public user;
  @Input()
  public date;

  constructor() { }

  public ngOnInit(): void { }
}
