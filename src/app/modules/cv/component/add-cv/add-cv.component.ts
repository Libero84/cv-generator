import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../service/cv.service';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss'],
})
export class AddCvComponent implements OnInit {
  fg!: FormGroup;

  constructor(private readonly cvService: CvService, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  addCv(): void {
    if (this.fg.invalid) {
      return;
    }
  }

  cancel(): void {}

  private initForm(): void {
    this.fg = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });
  }
}
