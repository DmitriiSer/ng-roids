import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsenalComponent } from './missile.component';

describe('ArsenalComponent', () => {
  let component: ArsenalComponent;
  let fixture: ComponentFixture<ArsenalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArsenalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsenalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
