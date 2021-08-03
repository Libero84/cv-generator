import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

enum TypeOfControlArray {
  EDUCATION = 'education',
  EXPERIENCE = 'experiences',
}

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss'],
})
export class AddCvComponent implements OnInit {
  fg!: FormGroup;
  typeOfControlArray!: typeof TypeOfControlArray;

  constructor(private readonly formBuilder: FormBuilder) {}

  get experiences(): FormArray {
    return this.fg.controls[TypeOfControlArray.EXPERIENCE] as FormArray;
  }

  get education(): FormArray {
    return this.fg.controls[TypeOfControlArray.EDUCATION] as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }

  addCv(): void {
    if (this.fg.invalid) {
      return;
    }
  }

  addExperience(): void {
    this.experiences.push(this.createExperiences());
  }

  addEducation(): void {
    this.education.push(this.createEducation());
  }

  cancel(): void {
    this.fg.reset();
    this.fg.clearValidators();
  }

  deleteItem(index: number, type: TypeOfControlArray): void {
    this[type].removeAt(index);
  }

  private initForm(): void {
    this.fg = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      [TypeOfControlArray.EDUCATION]: this.formBuilder.array([]),
      [TypeOfControlArray.EXPERIENCE]: this.formBuilder.array([]),
    });
  }

  private createExperiences(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  private createEducation(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
}
