import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BowlingComponent} from './bowling/bowling.component';
import {TableauScoreComponent} from './bowling/tableau-score/tableau-score.component';

@NgModule({
  declarations: [
    AppComponent,
    BowlingComponent,
    TableauScoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
