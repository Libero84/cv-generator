import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const initialForm = {
    username: '',
    password: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial form Login', () => {
    expect(component.fg.value).toEqual(initialForm);
  });

  it('check error required validation before set value in username', () => {
    const usernameEl = fixture.debugElement.query(By.css('[data-testId="username-login"]')).nativeElement.value;
    const reactiveUsernameEl = component.fg.get('username')?.value;

    expect(usernameEl).toEqual(reactiveUsernameEl);
    expect(reactiveUsernameEl.errors).not.toBeNull();
    expect(reactiveUsernameEl.errors.required).toBeTruthy();
  });

  it('check error required validation before set value in password', () => {
    const passwordEl = fixture.debugElement.query(By.css('[data-testId="password-login"]')).nativeElement.value;
    const reactivePasswordEl = component.fg.get('password')?.value;

    expect(passwordEl).toEqual(reactivePasswordEl);
    expect(reactivePasswordEl.errors).not.toBeNull();
    expect(reactivePasswordEl.errors.required).toBeTruthy();
  });

  it('chek value after entering value in username', () => {
    const usernameEl = fixture.debugElement.query(By.css('[data-testId="username-login"]')).nativeElement;
    const reactiveUsernameEl = component.fg.get('username');

    usernameEl.value = 'FakeUser';
    usernameEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(usernameEl.value).toEqual(reactiveUsernameEl?.value);
      expect(reactiveUsernameEl?.errors).toBeNull();
    });
  });

  it('check value after entering value in password', () => {
    const passwordEl = fixture.debugElement.query(By.css('[data-testId="password-login"]')).nativeElement;
    const reactivePsswordEl = component.fg.get('password');

    passwordEl.value = '1234*';
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(passwordEl.value).toEqual(reactivePsswordEl?.value);
      expect(reactivePsswordEl?.errors).toBeNull();
    });
  });

  it('check that form login is valid', () => {
    const passwordEl = fixture.debugElement.query(By.css('[data-testId="password-login"]')).nativeElement;
    const usernameEl = fixture.debugElement.query(By.css('[data-testId="username-login"]')).nativeElement;

    passwordEl.value = '1234*';
    usernameEl.value = 'FakeUser';

    passwordEl.dispatchEvent(new Event('input'));
    usernameEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.fg.valid).toBeTruthy();
    });
  });
});
