import {
  Component,
  OnInit, AfterContentInit,
  Input, HostBinding,
  ElementRef, ContentChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';

import { ShipService, Location, Size } from '../ship/ship.service';
import { ShipComponent } from '../ship/ship.component';
import { SpaceService } from './space.service';

import { BulletComponent } from '../ship/bullet/bullet.component';

@Component({
  selector: 'space',
  template: `
    <ng-content select="legend"></ng-content>
    <ng-content select="ship"></ng-content>
    <ng-template #bulletHost></ng-template>
  `,
  styleUrls: [`./space.component.scss`]
})
export class SpaceComponent implements OnInit, AfterContentInit {

  @HostBinding('style.width')
  @Input() width: string;
  @HostBinding('style.height')
  @Input() height: string;

  @ContentChild(ShipComponent) ship: ShipComponent;
  @ViewChild('bulletHost', { read: ViewContainerRef }) bulletHost: ViewContainerRef;

  private parentElem: Element;

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private spaceService: SpaceService,
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
        const width = this.getWidth();
        const height = this.getHeight();
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

  ngAfterContentInit(): void {
    this.spaceService.setBulletHostContainer(this.bulletHost);
    this.shipService.fireSourece
      .subscribe(() => {
        const shipLocation: Location = this.shipService.getLocation();
        const shipSize: Size = this.shipService.getSize();
        const shipangle: number = this.shipService.getAngle();

        const bulletRef = this.spaceService.createBullet();

        const bullet = (<BulletComponent>bulletRef.instance);

        bullet.setComponentRef(bulletRef);
        bullet.x = shipLocation.x + (shipSize.width - bullet.width) / 2;
        bullet.y = shipLocation.y - 9;
        bullet.angle = shipangle;

        bullet.bulletMaxDistance = Math.sqrt(Math.pow(this.getWidth(), 2) + Math.pow(this.getHeight(), 2));

        bullet.fire();

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
      const strWidth = window.getComputedStyle(this.parentElem).width;
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
      const strHeight = window.getComputedStyle(this.parentElem).height;
      if (strHeight != null || strHeight !== '') {
        height = Number(strHeight.substring(0, strHeight.length - 2));
        return height;
      }
      return 1;
    }
  }

}
