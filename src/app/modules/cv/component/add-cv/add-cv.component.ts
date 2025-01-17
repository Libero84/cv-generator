import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationBackService } from '../../../../helper/navigation-back.service';
import { ShareCvDataService } from '../../../../helper/share-cv-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Cv, Education, Experiences } from '../../../../models/cv';
import { CvService } from '../../service/cv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMsg } from '../../../../helper/errorMsg';
import { forEach as _forEach } from 'lodash';

enum TypeOfControlArray {
  EDUCATION = 'education',
  EXPERIENCE = 'experiences',
}

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss'],
})
export class AddCvComponent implements OnInit, OnDestroy {
  fg!: FormGroup;
  typeOfControlArray: typeof TypeOfControlArray = TypeOfControlArray;
  destroy$: Subject<any> = new Subject<any>();
  isAdd: boolean = true;
  cvId!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly navigationBack: NavigationBackService,
    private readonly shareCvData: ShareCvDataService,
    private readonly cvService: CvService
  ) {}

  get experiences(): FormArray {
    return this.fg.controls[TypeOfControlArray.EXPERIENCE] as FormArray;
  }

  get education(): FormArray {
    return this.fg.controls[TypeOfControlArray.EDUCATION] as FormArray;
  }

  ngOnInit(): void {
    this.shareCvData.cvData$.pipe(takeUntil(this.destroy$)).subscribe((data: Cv | null) => {
      this.isAdd = !data;
      this.initForm();
      if (data) {
        this.dispatchValue(data);
        this.cvId = data.id;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addCv(): void {
    if (this.fg.invalid) {
      return;
    }

    const body: Cv = this.fg.getRawValue();

    if (this.isAdd) {
      body.phone = body.phone.toString();
      this.cvService.createCv(body).subscribe(
        (res) => {
          console.info('added success: ', res);
        },
        (error: HttpErrorResponse) => errorMsg(error)
      );
    } else {
      this.cvService.updateCv(this.cvId, body).subscribe(
        (res) => console.info('update success: ', res),
        (error: HttpErrorResponse) => errorMsg(error)
      );
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
    this.fg.controls[TypeOfControlArray.EXPERIENCE].reset();
    this.fg.controls[TypeOfControlArray.EDUCATION].reset();
    this.fg.clearValidators();
  }

  close(): void {
    this.navigationBack.back();
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
      [TypeOfControlArray.EDUCATION]: this.formBuilder.array(this.isAdd ? [this.createEducation()] : []),
      [TypeOfControlArray.EXPERIENCE]: this.formBuilder.array(this.isAdd ? [this.createExperiences()] : []),
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

  private dispatchValue(data: Cv): void {
    this.patchEducation(data.education);
    this.patchExperience(data.experiences);
    this.fg.patchValue({
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      [TypeOfControlArray.EDUCATION]: data.education,
      [TypeOfControlArray.EXPERIENCE]: data.experiences,
    });
  }

  private patchEducation(educations: Education[]): void {
    _forEach(educations, () => {
      this.education.push(this.createEducation());
    });
  }

  private patchExperience(experiences: Experiences[]): void {
    _forEach(experiences, () => {
      this.experiences.push(this.createExperiences());
    });
  }
}
