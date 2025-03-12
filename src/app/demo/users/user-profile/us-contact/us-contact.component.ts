// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-us-contact',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './us-contact.component.html',
  styleUrls: ['./us-contact.component.scss']
})
export class UsContactComponent {}
