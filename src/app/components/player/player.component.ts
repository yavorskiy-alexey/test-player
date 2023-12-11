import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer
} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  paused = false;
  timestamp = new Date().getTime();
  totalSeconds = 0;
  currentSecond = 0;
  recordedValues: number[] = [];

  pause$ = new Subject<boolean>();
  play$ = new Subject<boolean>();
  live$ = new Subject<boolean>();
  valueUpdate = new ReplaySubject<number>(1);

  @Output() update = new EventEmitter<number>();

  ngOnInit() {
    this.init();
    this.valueUpdate.pipe(
      untilDestroyed(this),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((index: number) => {
      this.pause$.next(true);
      this.timestamp = this.recordedValues[index];
      this.update.emit(this.timestamp);
    });
  }

  play() {
    this.play$.next(true);
  }

  pause() {
    this.pause$.next(true);
  }

  live() {
    this.live$.next(false);
  }

  init() {
    this.play$
      .pipe(
        switchMap(_ =>
          timer(0, 1000).pipe(
            tap(_ => (this.paused = this.paused ? false : this.paused)),
            map((val) => {
              this.totalSeconds += 1;
              this.currentSecond += 1;
              const newTimestamp = this.timestamp += 1000;
              if (!this.recordedValues.includes(newTimestamp)) {
                this.recordedValues.push(newTimestamp);
              }
              return newTimestamp;
            }),
            takeUntil(this.pause$),
            switchMap(val => {
              this.update.next(val);
              return of(val);
            })
          )
        )
      )
      .subscribe({
      });
  }

  onUpdateValue(value?: number) {
    this.valueUpdate.next(value || 0);
  }
}

