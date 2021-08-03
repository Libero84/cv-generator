import { Component, Input } from '@angular/core';
import { Education } from '../../../../models/cv';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  @Input() data!: Education;
}
