import { Component, OnInit } from '@angular/core';
import {
  Observable, Observer,
  Subscriber, Subject
} from "rxjs/Rx";

@Component({
  selector: 'async-observable-pipe',
  template: '<div><code>observable|async</code>: Time: {{ time | async }}</div>'
})
export class AsyncObservablePipeComponentComponent implements OnInit {

  time = new Observable<string>((observer: Subscriber<string>) => {
    observer.complete = () => {
      console.debug(`complete`);
    };
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor() { }

  ngOnInit() { }

}


