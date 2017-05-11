import { Component, OnInit } from '@angular/core';

import { ShipService } from '../ship/ship.service';

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  acceleration: string;
  velocity = '0';

  constructor(private shipService: ShipService) { }

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
  }

}
