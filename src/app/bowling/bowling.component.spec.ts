import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BowlingComponent} from './bowling.component';
import {TableauScoreComponent} from "./tableau-score/tableau-score.component";
import {BowlingService} from "../service/bowling.service";

describe('BowlingComponent', () => {
  let component: BowlingComponent;
  let fixture: ComponentFixture<BowlingComponent>;
  let bowlingService: BowlingService;
  const valeurMockScore = 91;
  const BowlingServiceMock = {
    // get PartieEnCours: () => {return manches:[]},
    getScore: jest.fn(() => {
      return valeurMockScore;
    }),
    put: jest.fn(() => {
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
    const spybowling = spyOn(bowlingService, 'calculeLeScoreDunePartie');
    expect(component.getScore()).toBe(valeurMockScore);
    expect(spybowling.calls.count()).toEqual(1);
  });

});
