import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCvGenerationComponent } from './update-cv-generation.component';

describe('UpdateCvGenerationComponent', () => {
  let component: UpdateCvGenerationComponent;
  let fixture: ComponentFixture<UpdateCvGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCvGenerationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCvGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
