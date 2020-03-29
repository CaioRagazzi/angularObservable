import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  isActivate: boolean = false;
  private activateSub: Subscription

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });

    this.activateSub = this.userService.activatedSubject.subscribe((data: boolean) => {
      this.isActivate = data
    })
  }

  ngOnDestroy() {
    this.activateSub.unsubscribe();
  }

  onActivate() {
    this.userService.activatedSubject.next(!this.isActivate);
  }
}
