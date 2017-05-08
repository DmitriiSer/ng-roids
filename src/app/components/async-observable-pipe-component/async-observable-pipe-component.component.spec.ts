import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncObservablePipeComponentComponent } from './async-observable-pipe-component.component';

describe('AsyncObservablePipeComponentComponent', () => {
  let component: AsyncObservablePipeComponentComponent;
  let fixture: ComponentFixture<AsyncObservablePipeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncObservablePipeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncObservablePipeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
