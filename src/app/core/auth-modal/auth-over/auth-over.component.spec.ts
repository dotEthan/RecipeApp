import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOverComponent } from './auth-over.component';

describe('AuthOverComponent', () => {
  let component: AuthOverComponent;
  let fixture: ComponentFixture<AuthOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
