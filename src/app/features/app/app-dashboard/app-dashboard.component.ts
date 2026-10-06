import { Component, inject } from '@angular/core';

import { FeatureService } from '../../../core/services/feature.service';
import { WorkspaceService } from '../../../core/services/workspace.service';

@Component({
  selector: 'app-app-dashboard',
  standalone: true,
  templateUrl: './app-dashboard.component.html',
  styleUrl: './app-dashboard.component.scss'
})
export class AppDashboardComponent {
  readonly workspace = inject(WorkspaceService);
  readonly features = inject(FeatureService);
}
