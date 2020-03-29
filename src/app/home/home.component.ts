import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private interval: Subscription

  constructor() { }

  ngOnInit() {
    // this.interval = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    const customObsSubscription = Observable.create((observer) => {
      let count = 0
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete()
        }
        if (count >= 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000)
    })



    this.interval = customObsSubscription.pipe(filter((data) => {
      return data > 0
    }),map((data: number) => {
      return "Round: " + data
    })).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error.message);
    }, () => {
      console.log('completed');
    }
    )
  }

  ngOnDestroy() {
    this.interval.unsubscribe()
  }

}
