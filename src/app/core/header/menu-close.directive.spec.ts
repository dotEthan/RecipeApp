import { ElementRef, Component, DebugElement } from '@angular/core';

import { KeyBoardInputDirective } from './menu-close.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div class="header">
                <div class="beyond-burger active"></div>
                <div class="nav-header">
                  <div class="child active"></div>
                </div>
              </div>`
})
class TestMenuCloseComponent {

}

describe('OnEscapeDirective', () => {
  let component: TestMenuCloseComponent;
  let fixture: ComponentFixture<TestMenuCloseComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyBoardInputDirective, TestMenuCloseComponent]
    });

    fixture = TestBed.createComponent(TestMenuCloseComponent);
    component = fixture.componentInstance;
  });

  // it('should create an instance', () => {
  //   // let element: ElementRef;
  //   const directive = new MenuCloseDirective(inputEl);

  //   expect(directive).toBeTruthy();
  // });

  it('should remove the "active" class from BurgerMenu when Escape key is pressed', () => {
    const event = {
      keyCode: 27
    }
    inputEl = fixture.debugElement.query(By.css('.beyond-burger'));
    inputEl.triggerEventHandler('keyup', event);

    fixture.detectChanges();

    expect(inputEl.nativeElement.classList).not.toContain('active');
  })
});
