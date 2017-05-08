import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShipComponent } from './components/ship/ship.component';
import { SpaceComponent } from './components/space/space.component';

import { SpaceService } from "./components/space/space.service";
import { ShipService } from "./components/ship/ship.service";
import { LegendComponent } from './components/legend/legend.component';
import { FlameComponent } from './components/ship/flame/flame.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaceComponent,
    ShipComponent,
    LegendComponent,
    FlameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SpaceService,
    ShipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
