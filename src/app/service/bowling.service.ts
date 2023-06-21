import {Injectable} from '@angular/core';
import {Partie} from '../models/partie';
import {Manche} from "../models/manche";

@Injectable({
  providedIn: 'root'
})
export class BowlingService {
  partieEnCours: Partie = {manches: []};
  mancheEnCours: Manche = {};

  public calculeLeScoreDunePartie(partie: Partie): number {
    return this.calculeLeScoreDeChaqueManches(partie).reduce((partialSum, a) => partialSum + a, 0);
  }

  public calculeLeScoreDeChaqueManches(partie: Partie): number[] {
    let scoreDeLaPartie: number[] = [];
    let totalPourLaManche = 0;
    for (let index = 0; index < partie.manches.length; index++) {
      const value = partie.manches[index];
      if (value.premierTire) {
        totalPourLaManche += value.premierTire;
        if (this.strick(value)) {
          totalPourLaManche += this.ajouteLePremierTireSuivant(partie, index);
          totalPourLaManche += this.ajouteLeDeuxiemeTireSuivant(partie, index);

        }
      }
      if (value.deuxiemeTire) {
        totalPourLaManche += value.deuxiemeTire;
        if (this.estUnSpare(value)) {
          totalPourLaManche += this.ajouteLePremierTireSuivant(partie, index);
        }
      }
      scoreDeLaPartie.push(totalPourLaManche);
      totalPourLaManche = 0;
    }
    return scoreDeLaPartie;

  }

  effectuerUnLancer() {
    if (this.mancheEnCours.premierTire == null) {
      const scoreDuPremierTire = this.getScorePourUnTire();
      this.mancheEnCours.premierTire = scoreDuPremierTire;
      if (scoreDuPremierTire == 10) {
        this.nouvelleManche();
      }
    } else {
      this.mancheEnCours.deuxiemeTire = this.getScorePourUnTire(this.mancheEnCours.premierTire);
      this.nouvelleManche()
    }
  }

  public getNombreDeManches(): number {
    return this.partieEnCours.manches.length;
  }

  private ajouteLePremierTireSuivant(partie: Partie, index: number) {
    let mancheSuivante = partie.manches[index + 1];
    return mancheSuivante && mancheSuivante.premierTire ? mancheSuivante.premierTire : 0;
  }

  private strick(value: Manche) {
    return value.premierTire == 10;
  }

  private estUnSpare(value: Manche) {
    return value != undefined && value.premierTire && value?.deuxiemeTire && (value.premierTire + value.deuxiemeTire === 10);
  }

  private ajouteLeDeuxiemeTireSuivant(partie: Partie, index: number) {
    if (partie.manches[index + 1]) {

      let deuxiemeTireDansLaPartieSuivante = partie.manches[index + 1].deuxiemeTire;
      if (deuxiemeTireDansLaPartieSuivante) {
        return deuxiemeTireDansLaPartieSuivante;
      } else {
        return this.ajouteLePremierTireSuivant(partie, index + 1)
      }
    }
    return 0;
  }

  private getScorePourUnTire(nombreDeQuilleDejaTomber: number = 0): number {
    const nombreDeQuilleRestantes = 10 - nombreDeQuilleDejaTomber;
    return Math.ceil(Math.random() * nombreDeQuilleRestantes);
  }

  private nouvelleManche() {
    this.partieEnCours.manches.push(this.mancheEnCours);
    this.mancheEnCours = {};
  }
}
