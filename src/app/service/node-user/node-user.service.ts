import { Injectable } from '@angular/core';
import { NodeUser } from '../drupal-bridge/drupal-bridge.service';

@Injectable({
  providedIn: 'root'
})
export class NodeUserService {

  public value: NodeUser | undefined;

  constructor() { }
}
