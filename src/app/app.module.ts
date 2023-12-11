import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalComponent } from './components/signal/signal.component';
import { PlayerComponent } from './components/player/player.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { PausablePlayerComponent } from './components/pausable-player/pausable-player.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalComponent,
    PlayerComponent,
    PausablePlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    SliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
