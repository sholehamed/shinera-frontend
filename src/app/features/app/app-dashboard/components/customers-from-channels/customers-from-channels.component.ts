import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-customers-from-channels',
    imports: [MatCardModule, MatProgressBarModule],
    templateUrl: './customers-from-channels.component.html',
    styleUrl: './customers-from-channels.component.scss'
})
export class CustomersFromChannelsComponent {}