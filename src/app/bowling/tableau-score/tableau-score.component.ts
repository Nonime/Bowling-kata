import {Component, Input} from '@angular/core';
import {Manche} from '../../models/manche';

@Component({
  selector: 'app-tableau-score',
  templateUrl: './tableau-score.component.html'
})
export class TableauScoreComponent {
  @Input() manches: Manche[] = [];
  @Input() scores: number[] = [];
}
