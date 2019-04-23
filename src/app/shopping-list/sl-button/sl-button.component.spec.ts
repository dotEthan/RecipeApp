import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlButtonComponent } from './sl-button.component';

describe('SlButtonComponent', () => {
  let component: SlButtonComponent;
  let fixture: ComponentFixture<SlButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
