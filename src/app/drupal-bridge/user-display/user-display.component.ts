import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  public user;
  public date;

  constructor() { }

  public ngOnInit(): void {
  }

}
