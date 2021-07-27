import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const initialForm = {
    email: '',
    username: '',
    password: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [SharedModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial form Register', () => {
    expect(component.fg.value).toEqual(initialForm);
  });

  it('check error required in email before set value in email', () => {
    const emailEl = fixture.debugElement.query(By.css('[data-testId="email-register"]')).nativeElement.value;
    const reactiveEmailEl = component.fg.get('email')?.value;

    expect(emailEl).toEqual(reactiveEmailEl);
    expect(reactiveEmailEl.errors).not.toBeNull();
    expect(reactiveEmailEl.errors.required).toBeTruthy();
  });

  it('check error email in email when set incorrect email path', () => {
    const emailEl = fixture.debugElement.query(By.css('[data-testId="email-register"]')).nativeElement;
    const reactiveEmailEl = component.fg.get('email');

    emailEl.value = 'incorrect emial';

    emailEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emailEl.value).toEqual(reactiveEmailEl?.value);
      expect(reactiveEmailEl?.errors).not.toBeNull();
      expect(reactiveEmailEl?.errors?.email).toBeTruthy();
    });
  });

  it('check error required validation before set value in register username', () => {
    const usernameEl = fixture.debugElement.query(By.css('[data-testId]="username-register"')).nativeElement.value;
    const reactiveUsernameEl = component.fg.get('username')?.value;

    expect(usernameEl).toEqual(reactiveUsernameEl);
    expect(reactiveUsernameEl.errors).not.toBeNull();
    expect(reactiveUsernameEl.errors.required).toBeTruthy();
  });

  it('check error required validation before set value in register password', () => {
    const passwordEl = fixture.debugElement.query(By.css('[data-testId]="password-register"')).nativeElement.value;
    const reactivePasswordEl = component.fg.get('password')?.value;

    expect(passwordEl).toEqual(reactivePasswordEl);
    expect(reactivePasswordEl.errors).not.toBeNull();
    expect(reactivePasswordEl.errors.required).toBeTruthy();
  });

  it('check value after entering value in email register', () => {
    const emailEl = fixture.debugElement.query(By.css('[data-testId]="email-register"')).nativeElement;
    const reactiveEmailEl = component.fg.get('email');

    emailEl.value = 'test@test.pl';
    emailEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emailEl.value).toEqual(reactiveEmailEl?.value);
      expect(emailEl?.errors).toBeNull();
    });
  });

  it('check value after entering value in username register', () => {
    const usernameEl = fixture.debugElement.query(By.css('[data-testId]="username-register"')).nativeElement;
    const reactiveUsernameEl = component.fg.get('username');

    usernameEl.value = 'FakeUser';
    usernameEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(usernameEl.value).toEqual(reactiveUsernameEl?.value);
      expect(reactiveUsernameEl?.errors).toBeNull();
    });
  });

  it('check value after entering value in password register', () => {
    const passwordEl = fixture.debugElement.query(By.css('[data-testId]="password-register"')).nativeElement;
    const reactivePasswordEl = component.fg.get('password');

    passwordEl.value = '1234*';
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(passwordEl.value).toEqual(reactivePasswordEl?.value);
      expect(reactivePasswordEl?.errors).toBeNull();
    });
  });

  it('check that form register is valid', () => {
    const emailEl = fixture.debugElement.query(By.css('[data-testId]="email-register"')).nativeElement;
    const usernameEl = fixture.debugElement.query(By.css('[data-testId]="username-register"')).nativeElement;
    const passwordEl = fixture.debugElement.query(By.css('[data-testId]="password-register"')).nativeElement;

    emailEl.value = 'test@test.pl';
    usernameEl.value = 'FakeUser';
    passwordEl.value = '1234+';

    emailEl.dispatchEvent(new Event('input'));
    usernameEl.dispatchEvent(new Event('input'));
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.fg.valid).toBeTruthy();
    });
  });
});
