import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndRegisterComponent } from './login-and-register.component';

describe('LoginAndRegisterComponent', () => {
  let component: LoginAndRegisterComponent;
  let fixture: ComponentFixture<LoginAndRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginAndRegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle view to Register', () => {
    component.toggleView(false);

    expect(component.isLoginView).toEqual(false);
  });
});
