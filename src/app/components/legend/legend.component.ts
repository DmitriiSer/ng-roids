import { Component, OnInit, ElementRef, Renderer } from '@angular/core';

import { AppService } from "app/app.service";
import { ShipService } from '../ship/ship.service';

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  acceleration: string;
  velocity = '0';

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private appService: AppService,
    private shipService: ShipService) { }

  ngOnInit() {
    // subscribe to acceleration changes
    this.shipService.accelerationSource
      .subscribe(a => {
        this.acceleration = a.toFixed(5);
      });

    this.velocity = (0).toFixed(5);
    // subscribe to velocity changes
    this.shipService.velocitySource
      .subscribe(v => {
        this.velocity = v.toFixed(5);
      });

    // subscribe to key changes
    this.appService.pressedKeySource
      .subscribe((key: { key: string, active: boolean }) => {
        let elem: Element;
        switch (key.key) {
          case 'ArrowUp': elem = this.el.nativeElement.querySelector('.arrow-up'); break;
          case 'ArrowLeft': elem = this.el.nativeElement.querySelector('.arrow-left'); break;
          case 'ArrowRight': elem = this.el.nativeElement.querySelector('.arrow-right'); break;
          case ' ': elem = this.el.nativeElement.querySelector('.space-bar'); break;
        }
        if (elem != null) {
          this.renderer.setElementClass(elem, 'active', key.active);
        }
      });
  }

}
