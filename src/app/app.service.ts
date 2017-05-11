import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Rx";

@Injectable()
export class AppService {

  pressedKeySource: Subject<Object> = new Subject();

  constructor() { }

}
