import {
  Component,
  OnInit, OnChanges, SimpleChanges,
  Input, HostBinding,
  ElementRef, ViewChild, Renderer
} from '@angular/core';

@Component({
  selector: 'flame',
  templateUrl: './flame.component.html',
  styleUrls: ['./flame.component.scss']
})
export class FlameComponent implements OnInit, OnChanges {

  @Input() show: boolean;

  @HostBinding('style.opacity') opacity;

  @ViewChild('flameContainer') flameContainer: ElementRef;

  constructor(private renderer: Renderer) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] != null) {
      if (changes['show'].currentValue) {
        this.renderer.setElementStyle(this.flameContainer.nativeElement, 'height', '16px');
      } else {
        this.renderer.setElementStyle(this.flameContainer.nativeElement, 'height', '30px');
      }
    }
  }
}
