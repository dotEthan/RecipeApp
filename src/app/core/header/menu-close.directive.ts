import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appKeyBoardInput]'
})
export class KeyBoardInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('document:keyup', ['$event']) onEscape(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === 27) {
      this.closeMenu();
    }
  }

  closeMenu() {
    const beyondBurger = this.el.nativeElement.children[1];
    const navHeader = this.el.nativeElement.children[2];

    if (navHeader.classList.contains('active')) {
      const childLength = beyondBurger.children[0].children.length;

      navHeader.classList.remove('active');

      beyondBurger.children[0].classList.remove('active');
      for (let i = 0; i < childLength; i++) {
        beyondBurger.children[0].children[i].classList.remove('stopped');
      }
    }
  }

}
