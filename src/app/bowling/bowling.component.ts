import {Component, OnInit} from '@angular/core';
import {Partie} from "../model/partie";
import {Manche} from "../model/manche";

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {

  partieEnCours: Partie = {manches: []};
  mancheEnCours: Manche = {};
  constructor() { }

  ngOnInit(): void {
  }

  effectuerUnLancer() {
    if (!this.mancheEnCours.premierTire) {
      const scorePourUnTire = this.getScorePourUnTire();
      let strick = scorePourUnTire == '10';
      this.mancheEnCours.premierTire = strick ? 'X' : scorePourUnTire;
      if (strick) {
        this.nouvelleManche()
      }
    } else {
      const scorePourLeDeuxiemeTire = this.getScorePourUnTire(parseInt(this.mancheEnCours.premierTire));


    }
  }

  private getScorePourUnTire(nombreDeQuilleRestantes: number = 10): string {
    return (Math.random() * nombreDeQuilleRestantes).toString();
  }

  private nouvelleManche() {
    this.partieEnCours.manches.push(this.mancheEnCours);
    this.mancheEnCours = {};
  }
}
