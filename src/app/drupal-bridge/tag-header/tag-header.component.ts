import { Component, Input, OnInit } from '@angular/core';
import { Uid } from '../../service/drupal-bridge/drupal-bridge.service';
import { TagHelperService } from '../../service/tag-helper/tag-helper.service';

@Component({
  selector: 'app-tag-header',
  templateUrl: './tag-header.component.html',
  styleUrls: ['./tag-header.component.css']
})
export class TagHeaderComponent implements OnInit {

  @Input() public tag: Uid;

  constructor(public tagHelper: TagHelperService) { }

  public ngOnInit(): void {
  }

}
