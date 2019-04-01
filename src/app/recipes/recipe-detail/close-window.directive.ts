import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appCloseWindow]'
})
export class CloseWindowDirective {

  constructor(private el: ElementRef,
    private router: Router) { }

  @HostListener('document:keyup', ['$event']) onEscape(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.router.navigate(['/recipes']);
    }
  }
}
