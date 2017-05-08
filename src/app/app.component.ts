import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import { ShipService } from "./components/ship/ship.service";
import { Subject } from "rxjs/Rx";

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
  keyMapSource: Subject<Object> = new Subject();

  private initialShipLocation = { x: 350, y: 450 };

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    // set initial ship location
    if (this.initialShipLocation != null) {
      this.shipService.setLocation(this.initialShipLocation);
    }
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keydown(ev: KeyboardEvent) {
    let e: any = ev || event;
    // e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    //console.debug(`next: key = ${e.key}`);
    switch (e.key) {
      case 'ArrowUp':
        if (e.type == 'keydown') {
          this.shipService.accelerate();
        } else {
          this.shipService.decelerate();
        }
        break;
      case 'ArrowLeft':
        if (e.type == 'keydown') {
          this.shipService.rotateLeft();
        }
        break;
      case 'ArrowRight':
        if (e.type == 'keydown') {
          this.shipService.rotateRight();
        }
        break;
    }
    this.keyMap[e.key] = e.type == 'keydown';
  }
}
