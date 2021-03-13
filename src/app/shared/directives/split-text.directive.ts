import { Directive, ElementRef, OnInit } from '@angular/core';
import { MyUtils } from '../../utilities/maafa.utils';

@Directive({
  selector: '[SplitText]'
})
export class SplitTextDirective implements OnInit {

  constructor(public el: ElementRef) {
    
  }

  ngOnInit() {
   // console.log("split text dir => ",this.el.nativeElement,this.el.nativeElement.innerText);
    
   //split the text and return new text
    let newLabelText = MyUtils.splitCamelCaseString(this.el.nativeElement.innerText);
    this.el.nativeElement.innerText = newLabelText;
  }

}
