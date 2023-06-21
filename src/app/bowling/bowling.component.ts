import {Component, OnInit} from '@angular/core';
import {Partie} from '../models/partie';
import {Manche} from '../models/manche';
import {BowlingService} from "../service/bowling.service";

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {


  constructor(public readonly bowlingService: BowlingService) { }
  ngOnInit(): void {
  }
  public getBilanDeLaManche(): string {
    return JSON.stringify(this.bowlingService.mancheEnCours);
  }
  public getBilanDeLaPartie(): string {
    return JSON.stringify(this.bowlingService.partieEnCours);
  }
  public getScore() {
    return this.bowlingService.calculeLeScoreDunePartie(this.bowlingService.partieEnCours);
  }
  public clickSurLancer() {
    this.bowlingService.effectuerUnLancer();
  }

}
