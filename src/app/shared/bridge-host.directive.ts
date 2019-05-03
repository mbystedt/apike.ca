import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-bridge-host]',
})
export class BridgeHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
