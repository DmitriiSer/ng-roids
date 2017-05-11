import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';

import { ShipService } from './components/ship/ship.service';
import { Subject } from 'rxjs/Rx';
import { AppService } from "app/app.service";

/*export enum Key {
  ArrowUp = 38, ArrowDown = 40,
  ArrowLeft = 37, ArrowRight = 39,
  W = 87, S = 83, A = 65, D = 68
}*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  keyMap = {};

  private initialShipLocation = { x: 350, y: 450 };

  constructor(
    private appService: AppService,
    private shipService: ShipService) { }

  ngOnInit(): void {
    // set initial ship location
    if (this.initialShipLocation != null) {
      this.shipService.setLocation(this.initialShipLocation);
    }
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keydown(ev: KeyboardEvent) {
    const e: any = ev || event;
    // e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    let keyEvent: {
      key: string;
      active?: boolean;
    };

    switch (e.key) {
      case 'ArrowUp':
        keyEvent = { key: e.key }
        if (e.type === 'keydown') {
          keyEvent.active = true;
          this.shipService.accelerate();
        } else {
          keyEvent.active = false;
          this.shipService.decelerate();
        }
        break;
      case 'ArrowLeft':
        keyEvent = { key: e.key }
        if (e.type === 'keydown') {
          keyEvent.active = true;
          this.shipService.rotateLeft();
        } else {
          keyEvent.active = false;
        }
        break;
      case 'ArrowRight':
        keyEvent = { key: e.key }
        if (e.type === 'keydown') {
          keyEvent.active = true;
          this.shipService.rotateRight();
        } else {
          keyEvent.active = false;
        }
        break;
      case ' ':
        keyEvent = { key: e.key }
        if (e.type === 'keydown') {
          keyEvent.active = true;
          this.shipService.fireStart();
        } else {
          keyEvent.active = false;
          this.shipService.fireStop();
        }
        break;
    }

    if (keyEvent != null) {
      this.appService.pressedKeySource.next(keyEvent);
    }

    this.keyMap[e.key] = e.type === 'keydown';
  }
}
