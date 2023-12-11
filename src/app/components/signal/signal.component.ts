import {Component, Input} from '@angular/core';
import {ISignal} from '../../models/interfaces';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent {

  @Input() signal?: ISignal;
}
