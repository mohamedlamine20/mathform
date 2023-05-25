import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, map } from 'rxjs';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective implements OnInit {
  constructor(private el: ElementRef, private controleName: NgControl) {}
  ngOnInit(): void {
    this.controleName.control?.parent?.valueChanges
      .pipe(map(({ a, b, answer }) => Math.abs(a + b - answer) / (a + b)))
      .subscribe((value) => {
        console.log(value);

        if (value < 0.2) {
          this.el.nativeElement.classList.add('close');
        } else {
          this.el.nativeElement.classList.remove('close');
        }
      });
  }
}
