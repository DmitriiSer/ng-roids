import {
  Component,
  OnInit,
  Input, HostBinding
} from '@angular/core';

import { ShipService, Location } from "./ship.service";

@Component({
  selector: 'ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {
  @HostBinding('style.left')
  @Input() x: string;
  @HostBinding('style.top')
  @Input() y: string;

  @HostBinding('style.transform') rotate: string;

  angle: string;
  maxVelocity = 1.6260; // 1.6260;   // m/s
  acceleration = 0.00098; // 0.00098; // m/s
  isAccelerating = false;

  constructor(private shipService: ShipService) { }

  ngOnInit() {
    // set initial ship location
    if (this.x == null || this.y == null) {
      let location = this.shipService.getLocation();
      this.x = location.x + 'px';
      this.y = location.y + 'px';
    } else {
      let x = this.x.endsWith('px') ?
        Number(this.x.substring(0, this.x.length - 2)) : 0;
      let y = this.y.endsWith('px') ?
        Number(this.y.substring(0, this.y.length - 2)) : 0;
      this.shipService.setLocation(new Location(x, y));
    }

    // set initial ship angle
    let angle = 0;
    this.shipService.setAngle(angle);
    this.angle = angle + 'deg';
    this.rotate = `rotate(${angle}deg)`;

    // set ship acceleration and max velocity
    this.shipService.setAcceleration(this.acceleration);
    this.shipService.setMaxVelocity(this.maxVelocity);

    // subscribe to ship movements
    this.shipService.locationSourece
      .subscribe((location: Location) => {
        this.x = location.x + 'px';
        this.y = location.y + 'px';
      });

    // subscribe to ship rotations
    this.shipService.rotationSourece
      .subscribe(angle => {
        this.rotate = `rotate(${angle}deg)`;
      });

    // subscribe to ship acceleration
    this.shipService.acceleratingSource
      .subscribe(isAccelerating => {
        this.isAccelerating = isAccelerating;
      });

  }

}
