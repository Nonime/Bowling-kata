import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableauScoreComponent} from './tableau-score.component';

describe('TableauScoreComponent', () => {
  let component: TableauScoreComponent;
  let fixture: ComponentFixture<TableauScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableauScoreComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
