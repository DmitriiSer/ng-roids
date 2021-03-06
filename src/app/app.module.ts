import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShipComponent } from './components/ship/ship.component';
import { SpaceComponent } from './components/space/space.component';

import { LegendComponent } from './components/legend/legend.component';
import { FlameComponent } from './components/ship/flame/flame.component';
import { MissileComponent } from './components/ship/missile/missile.component';
import { BulletComponent } from './components/ship/bullet/bullet.component';

import { AppService } from "app/app.service";
import { SpaceService } from './components/space/space.service';
import { ShipService } from './components/ship/ship.service';

@NgModule({
  declarations: [
    AppComponent,
    SpaceComponent,
    ShipComponent,
    LegendComponent,
    FlameComponent,
    MissileComponent,
    BulletComponent
  ],
  entryComponents: [BulletComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AppService,
    SpaceService,
    ShipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
