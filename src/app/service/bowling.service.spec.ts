import {TestBed} from '@angular/core/testing';

import {BowlingService} from './bowling.service';
import {Partie} from '../models/partie';

describe('BowlingServiceService', () => {
  let service: BowlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowlingService);
    service.nouvellePartie();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Calcule le score pour une manches', () => {
    const partie: Partie = {manches: [{premierTire: 8, deuxiemeTire: 1}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(9);
  });

  it('Calcule le score pour un stricke et une manches', () => {
    const partie: Partie = {manches: [{premierTire: 10}, {premierTire: 8, deuxiemeTire: 1}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(28);
  });

  it('Calcule le score pour un spare', () => {
    const partie: Partie = {manches: [{premierTire: 8, deuxiemeTire: 2}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(10);
  });
  it('Calcule le score pour un spare et un tire', () => {
    const partie: Partie = {manches: [{premierTire: 8, deuxiemeTire: 2}, {premierTire: 8}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(26);
  });
  it('Calcule le score pour un spare et une  manches', () => {
    const partie: Partie = {manches: [{premierTire: 8, deuxiemeTire: 2}, {premierTire: 8, deuxiemeTire: 1}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(27);
  });

  it('Calcule le score pour deux stricke', () => {
    const partie: Partie = {manches: [{premierTire: 10}, {premierTire: 10}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(30);
  });

  it('Calcule le score pour deux stricke et un tire', () => {
    const partie: Partie = {manches: [{premierTire: 10}, {premierTire: 10}, {premierTire: 8, deuxiemeTire: 2}]};
    expect(service.calculeLeScoreDeChaqueManches(partie).toString()).toBe([28, 20, 10].toString());
  });

  it('Calcule le score pour deux stricke et une manches', () => {
    const partie: Partie = {manches: [{premierTire: 10}, {premierTire: 10}, {premierTire: 8, deuxiemeTire: 1}]};
    expect(service.calculeLeScoreDunePartie(partie)).toBe(56);
  });

  it('Calcule le score pour quatres stricke et une  manches', () => {
    const partie: Partie = {
      manches: [{premierTire: 10}, {premierTire: 10}, {premierTire: 10}, {premierTire: 10}, {
        premierTire: 8,
        deuxiemeTire: 1
      }]
    };
    expect(service.calculeLeScoreDunePartie(partie)).toBe(116);
  });

  it('effectueUnLancer', () => {
    service.effectuerUnLancer();
    expect(service.mancheEnCours.premierTire).toBeDefined();
  });

  it('effectue deux lancer passe à la nouvelle manche', () => {
    service.effectuerUnLancer();
    service.effectuerUnLancer();
    expect(service.mancheEnCours).toEqual({});
    expect(service.partieEnCours.manches[0].premierTire).toBeDefined();
    expect(service.partieEnCours.manches[0].deuxiemeTire).toBeDefined();
  });

});
