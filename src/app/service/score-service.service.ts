import { Injectable } from '@angular/core';
import {Partie} from '../model/partie';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {

  constructor() { }

  public calculeLeScoreDunePartie(partie :Partie): number {
    return 0;

  }
}
