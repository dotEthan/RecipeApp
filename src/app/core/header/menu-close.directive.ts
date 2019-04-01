import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMenuClose]'
})
export class MenuCloseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('document:keyup', ['$event']) onEscape(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      const beyondBurger = this.el.nativeElement.children[1];
      const navHeader = this.el.nativeElement.children[2];
      if (navHeader.classList.contains('active')) {
        navHeader.classList.remove('active');
        beyondBurger.children[0].classList.remove('active');
        const childLength = beyondBurger.children[0].children.length;
        for (let i = 0; i < childLength; i++) {
          beyondBurger.children[0].children[i].classList.remove('stopped');
        }
      }
    }
  }

}
