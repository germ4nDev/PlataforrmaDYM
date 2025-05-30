// angular import
import { Component } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonContentComponent } from '../common-content/common-content.component';

@Component({
  selector: 'app-theme-horizontal',
  standalone: true,
  imports: [SharedModule, CommonContentComponent],
  templateUrl: './theme-horizontal.component.html',
  styleUrls: ['./theme-horizontal.component.scss']
})
export default class ThemeHorizontalComponent {}
