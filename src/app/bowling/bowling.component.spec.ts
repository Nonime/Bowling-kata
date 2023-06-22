import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BowlingComponent} from './bowling.component';
import {TableauScoreComponent} from './tableau-score/tableau-score.component';
import {BowlingService} from '../service/bowling.service';

describe('BowlingComponent', () => {
  let component: BowlingComponent;
  let fixture: ComponentFixture<BowlingComponent>;
  let bowlingService: BowlingService;
  const valeurMockScore = 91;
  const mockDeLaPartie = {manches: []};
  const mockScoreParMaches = [5, 30, 20, 10, 5];
  const BowlingServiceMock = {
    partieEnCours: mockDeLaPartie,
    calculeLeScoreDeChaqueManches: jest.fn(() => {
      return mockScoreParMaches;
    }),
    calculeLeScoreDunePartie: jest.fn(() => {
      return valeurMockScore;
    }),
    effectuerUnLancer: jest.fn(() => {
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BowlingComponent,
        TableauScoreComponent
      ],
      providers: [
        {provide: BowlingService, useValue: BowlingServiceMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingComponent);
    component = fixture.componentInstance;
    bowlingService = TestBed.inject(BowlingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getScore appel le bowling service', () => {
    const spybowling = jest.spyOn(bowlingService, 'calculeLeScoreDunePartie');
    expect(component.getScore()).toBe(valeurMockScore);
    expect(spybowling).toHaveBeenCalled();
  });

  it('getBilanDeLaPartie appel le bowling service', () => {
    expect(component.getBilanDeLaPartie()).toBe(mockDeLaPartie.manches);
  });

  it('getScoreParManches appel le bowling service', () => {
    const spybowling = jest.spyOn(bowlingService, 'calculeLeScoreDeChaqueManches');
    expect(component.getScoreParManches()).toBe(mockScoreParMaches);
    expect(spybowling).toHaveBeenCalled();
  });

  it('clickSurLancer appel le bowling service', () => {
    const spybowling = jest.spyOn(bowlingService, 'effectuerUnLancer');
    component.clickSurLancer();
    expect(spybowling).toHaveBeenCalled();
  });

});
