import { TestBed } from '@angular/core/testing';

import { ScoreServiceService } from './score-service.service';
import {Partie} from "../model/partie";

describe('ScoreServiceService', () => {
  let service: ScoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Calcule le score pour une martie de avec une manches', () => {
    const partie: Partie = {manches : [{premierTire: '8', deuxiemeTire: '1'}]}
    expect(service.calculeLeScoreDunePartie(partie)).toBe(9);
  });
});
