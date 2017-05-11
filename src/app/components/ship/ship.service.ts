import { Injectable } from '@angular/core';

import {
  Observable,
  Subject,
  Subscription
} from 'rxjs/Rx';

export class Location {
  constructor(public x: number, public y: number) { }
}

export class Size {
  constructor(public width: number, public height: number) { }
}

@Injectable()
export class ShipService {

  location: Location = { x: 0, y: 0 };
  size: Size = { width: 28, height: 36 };
  angle = 0;
  private angleStep = 10;

  private acceleration = 0;
  private deceleration = 0;
  private maxVelocity = 0;
  private velocity = 0;

  velocitySource: Subject<number> = new Subject();
  accelerationSource: Subject<number> = new Subject();
  acceleratingSource: Subject<boolean> = new Subject();
  locationSourece: Subject<Location> = new Subject();
  rotationSourece: Subject<number> = new Subject();
  fireSourece: Subject<{}> = new Subject();

  private accTimerSubscription: Subscription;
  private decTimerSubscription: Subscription;
  private fireTimerSubscription: Subscription;

  private accelerating = false;

  private decAngle = 0;

  constructor() { }

  getLocation(): Location {
    return this.location;
  }

  setLocation(location: Location): void {
    this.location = location;
    this.locationSourece.next(location);
  }

  getSize(): Size {
    return this.size;
  }

  getAngle(): number {
    return this.angle;
  }

  setAngle(angle: number): void {
    this.angle = angle;
    this.rotationSourece.next(angle);
  }

  getAcceleration(): number {
    return this.acceleration;
  }

  setAcceleration(acceleration: number): void {
    this.acceleration = Math.abs(acceleration);
    this.deceleration = -this.acceleration;
    this.accelerationSource.next(acceleration);
  }

  getVelocity(): number {
    return this.velocity;
  }

  setVelocity(velocity: number) {
    this.velocity = velocity;
    this.velocitySource.next(velocity);
  }

  setMaxVelocity(maxVelocity: number): void {
    this.maxVelocity = maxVelocity;
  }

  isAccelerating(): boolean {
    return this.accelerating;
  }

  setAccelerating(accelerating: boolean) {
    this.accelerating = accelerating;
    this.acceleratingSource.next(accelerating);
  }

  private calculateVelocity(vInit: number, decelerate?: boolean): number {
    let a;
    if (decelerate) {
      a = this.deceleration;
    } else {
      a = this.acceleration;
    }
    const v = vInit + a;
    if (v < 0) {
      return 0;
    } else if (v > this.maxVelocity) {
      return this.maxVelocity;
    } else {
      return v;
    }
  }

  accelerate(): void {
    if (this.decTimerSubscription != null) {
      this.decTimerSubscription.unsubscribe();
      this.decTimerSubscription = null;
    }
    if (this.accTimerSubscription == null) {
      this.setAccelerating(true);
      this.accTimerSubscription = Observable.timer(0, 1)
        .subscribe(val => {
          this.setVelocity(this.calculateVelocity(this.velocity));
          // console.debug(`acc: a = ${this.acceleration}, v = ${this.velocity}`);
          const angleInRad = ((90 - this.angle) * Math.PI) / 180;
          const cos = Math.cos(angleInRad);
          const sin = Math.sin(angleInRad);
          const location = {
            x: this.location.x + this.velocity * cos,
            y: this.location.y - this.velocity * sin
          };
          this.setLocation(location);
        });
    }
  }

  decelerate(): void {
    if (this.accTimerSubscription != null) {
      this.accTimerSubscription.unsubscribe();
      this.accTimerSubscription = null;
    }
    if (this.decTimerSubscription == null) {
      this.setAccelerating(false);
      this.decAngle = this.angle;
      this.decTimerSubscription = Observable.timer(0, 1)
        .subscribe(val => {
          this.setVelocity(this.calculateVelocity(this.velocity, true));
          // console.debug(`dec: a = ${this.deceleration}, v = ${this.velocity}`);
          if (this.velocity === 0) {
            this.decTimerSubscription.unsubscribe();
            this.decTimerSubscription = null;
            return;
          } else {
            this.decelerate();
          }

          const angleInRad = ((90 - this.decAngle) * Math.PI) / 180;
          const cos = Math.cos(angleInRad);
          const sin = Math.sin(angleInRad);
          const location = {
            x: this.location.x + this.velocity * cos,
            y: this.location.y - this.velocity * sin
          };
          this.setLocation(location);
        });
    }
  }

  rotateLeft(): void {
    // console.debug(`rotL`);
    let angle = this.angle - this.angleStep;
    if (angle < 0) {
      angle += 360;
    }
    this.setAngle(angle);
  }

  rotateRight(): void {
    // console.debug(`rotR`);
    let angle = this.angle + this.angleStep;
    if (angle > 360) {
      angle -= 360;
    }
    this.setAngle(angle);
  }

  fireStart(): void {
    if (this.fireTimerSubscription == null) {
      // console.debug(`fireStart`);
      this.fireTimerSubscription = Observable.timer(0, 200)
        .subscribe(() => {
          this.fireSourece.next();
        });
    }
  }
  fireStop() {
    // console.debug(`fireStop`);
    if (this.fireTimerSubscription != null) {
      this.fireTimerSubscription.unsubscribe();
      this.fireTimerSubscription = null;
    }
  }
}
