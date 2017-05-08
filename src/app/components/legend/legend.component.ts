import { Component, OnInit } from '@angular/core';

import { ShipService } from "../ship/ship.service";

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  acceleration: string;
  velocity: string;

  constructor(private shipService: ShipService) { }

  ngOnInit() {
    // get ship acceleration
    this.acceleration = this.shipService.getAcceleration().toFixed(4);

    // subscribe to velocity changes
    this.shipService.velocitySource
      .subscribe(v => {
        this.velocity = v.toFixed(4);
      });
  }

}
