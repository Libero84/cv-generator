import { Component, Input } from '@angular/core';
import { Experiences } from '../../../../models/cv';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent {
  @Input() data!: Experiences;
}
