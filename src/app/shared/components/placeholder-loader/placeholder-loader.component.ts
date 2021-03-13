import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-placeholder-loader',
  templateUrl: './placeholder-loader.component.html',
  styleUrls: ['./placeholder-loader.component.scss']
})
export class PlaceholderLoaderComponent implements OnInit {

  @Input() CWidth;
  @Input() CHeight;
  @Input() circle: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getStyles() {
    const _styles = {
      'width.px': this.CWidth ? this.CWidth : '',
      'height.px': this.CHeight ? this.CHeight : '',
      'border-radius': this.circle ? '50%' : '',
    };

    return _styles;
  }

}
