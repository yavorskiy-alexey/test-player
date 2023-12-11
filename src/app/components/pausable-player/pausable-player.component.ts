import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  bufferToggle,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
  timer,
  windowToggle
} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-pausable-player',
  templateUrl: './pausable-player.component.html',
  styleUrls: ['./pausable-player.component.scss']
})
export class PausablePlayerComponent implements OnInit {

  value: number = 0;
  counter: number = 0;
  paused: boolean = false;
  values: number[] = [];
  pauseSubject$: Subject<boolean> = new Subject();
  @Output() update = new EventEmitter<number>();

  pauseOn$: Observable<boolean> = this.pauseSubject$.pipe(
    filter((v) => !v)
  );
  pauseOff$: Observable<boolean> = this.pauseSubject$.pipe(
    filter((v) => v)
  );
  testSubject: Subject<number> = new Subject();

  play$ = new Subject<boolean>();
  valueUpdate = new ReplaySubject<number>(1);
  timeStamp: number = new Date().getTime();


  ngOnInit() {
    const result: Observable<number> = merge(
      this.testSubject.pipe(
        bufferToggle(this.pauseOff$, () => this.pauseOn$),
        mergeMap((x) => x),
      ),
      this.testSubject.pipe(
        windowToggle(this.pauseOn$, () => this.pauseOff$),
        mergeMap((x) => x)
      )
    );


    result.pipe(
      untilDestroyed(this)
    ).subscribe((v) => {
      this.values.push(v);
      this.update.emit(this.timeStamp + v * 1000);
    });

    this.valueUpdate.pipe(
      untilDestroyed(this),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((index: number) => {

      this.pause(true)

      this.value = index;
      this.update.emit(this.timeStamp + this.value * 1000);
    });


    this.play$
      .pipe(
        switchMap(_ =>
          timer(0, 1000).pipe(
            map((val) => {
              this.counter++;
              this.testSubject.next(this.counter);
              return this.counter;
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe({});

    this.pauseSubject$.next(true);
    this.pauseSubject$.next(false);
  }

  play() {
    this.play$.next(true);
  }

  pause(value: boolean) {
    this.paused = value;
    this.pauseSubject$.next(this.paused);
  }

  live() {
    this.pause(false)
    this.value = this.values.length - 1;
  }

  onUpdateValue(value?: number) {
    this.valueUpdate.next(value || 0);
  }
}
