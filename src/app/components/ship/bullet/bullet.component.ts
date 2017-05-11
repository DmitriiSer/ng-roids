import {
  Component,
  OnInit,
  ElementRef, HostBinding, ComponentRef
} from '@angular/core';

import * as Velocity from 'velocity-animate';

@Component({
  selector: 'bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.scss']
})
export class BulletComponent implements OnInit {

  @HostBinding('style.left.px') x = 0;
  @HostBinding('style.top.px') y = 0;

  @HostBinding('style.width.px') width = 2;
  @HostBinding('style.height.px') height = 12;

  @HostBinding('style.transformOrigin') transformOrigin = '1px 35px';

  angle = 0;

  bulletMaxDistance: number;

  bulletRef: ComponentRef<BulletComponent>;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // console.log(`BulletComponent::ngOnInit()`);
    // console.debug(`x = ${this.x}, y = ${this.y}, angle = ${this.angle}`);
  }

  setComponentRef(bulletRef: ComponentRef<BulletComponent>): void {
    this.bulletRef = bulletRef;
  }

  fire(): void {
    // console.log(`BulletComponent::fire()`);
    const elem = this.el.nativeElement;
    const easeInBack = [0.6, -0.28, 0.735, 0.045];

    Velocity.hook(elem, 'rotateZ', `${this.angle}deg`);
    const distance = this.bulletMaxDistance;
    // duration for the bullet to cross the widest part of the space
    const duration = 1000;

    Velocity(elem, { translateY: `-=${distance}px` },
      {
        duration: duration,
        easing: 'linear',
        complete: () => { this.bulletRef.destroy(); }
      });
  }
}
