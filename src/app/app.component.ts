import {Component} from '@angular/core';
import {ISignal} from './models/interfaces';
import {generateSignal} from './helpers/general-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  signal?: ISignal;

  onUpdateSignal(timeStamp: number) {
    this.signal = generateSignal(timeStamp);
  }
}
