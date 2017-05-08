import {
  Component,
  OnInit,
  Input, HostBinding,
  ElementRef, ContentChild
} from '@angular/core';

import { ShipService, Location } from "../ship/ship.service";
import { ShipComponent } from "../ship/ship.component";

@Component({
  selector: 'space',
  template: `
    <ng-content select="legend"></ng-content>
    <ng-content select="ship"></ng-content>
  `,
  styleUrls: [`./space.component.scss`]
})
export class SpaceComponent implements OnInit {
  @HostBinding('style.width')
  @Input() width: string;
  @HostBinding('style.height')
  @Input() height: string;

  @ContentChild(ShipComponent) ship: ShipComponent;

  private parentElem: Element;

  constructor(
    private el: ElementRef,
    private shipService: ShipService) {
    this.parentElem = el.nativeElement.parentElement;
  }

  ngOnInit() {
    if (this.width == null) {
      this.width = '100%';
    }
    if (this.height == null) {
      this.height = '100%';
    }

    this.shipService.locationSourece
      .subscribe((location: Location) => {
        let width = this.getWidth();
        let height = this.getHeight();
        switch (true) {
          case location.x < -32:
            this.shipService.setLocation(new Location(width, location.y));
            break;
          case location.y < -32:
            this.shipService.setLocation(new Location(location.x, height));
            break;
          case location.x > width + 32:
            this.shipService.setLocation(new Location(-32, location.y));
            break;
          case location.y > height + 32:
            this.shipService.setLocation(new Location(location.x, -32));
            break;
        }
      });
  }

  private getWidth(): number {
    let width: number;
    if (this.width.endsWith('px')) {
      // the space width is in PX, return it
      width = Number(this.width.substring(0, this.width.length - 2));
      return width;
    } else {
      // the space width in %, return parents width
      let strWidth = window.getComputedStyle(this.parentElem).width;
      if (strWidth != null || strWidth !== '') {
        width = Number(strWidth.substring(0, strWidth.length - 2));
        return width;
      }
      return 1;
    }
  }

  private getHeight(): number {
    let height: number;
    if (this.height.endsWith('px')) {
      // the space width is in PX, return it
      height = Number(this.height.substring(0, this.height.length - 2));
      return height;
    } else {
      // the space width in %, return parents width
      let strHeight = window.getComputedStyle(this.parentElem).height;
      if (strHeight != null || strHeight !== '') {
        height = Number(strHeight.substring(0, strHeight.length - 2));
        return height;
      }
      return 1;
    }
  }
}
