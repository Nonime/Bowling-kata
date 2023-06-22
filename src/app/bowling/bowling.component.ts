import {Component} from '@angular/core';
import {Manche} from '../models/manche';
import {BowlingService} from '../service/bowling.service';

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html'
})
export class BowlingComponent {

  constructor(public readonly bowlingService: BowlingService) {
  }

  public getBilanDeLaPartie(): Manche[] {
    return this.bowlingService.partieEnCours.manches;
  }

  public getScore() {
    return this.bowlingService.calculeLeScoreDunePartie(this.bowlingService.partieEnCours);
  }

  public getScoreParManches() {
    return this.bowlingService.calculeLeScoreDeChaqueManches(this.bowlingService.partieEnCours);
  }

  public clickSurLancer() {
    this.bowlingService.effectuerUnLancer();
  }

  public clickSurNouvellePartie() {
    this.bowlingService.nouvellePartie();
  }

}
