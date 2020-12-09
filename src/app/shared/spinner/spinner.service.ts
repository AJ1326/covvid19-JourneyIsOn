import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Injectable()
export class SpinnerService {
  private visible$ = new BehaviorSubject<boolean>(false);

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  isVisible(): Observable<boolean> {
    return this.visible$.asObservable().pipe(share());
  }
}
