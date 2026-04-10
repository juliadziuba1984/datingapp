import {Component, inject} from '@angular/core';
import {MembersService} from '../../../core/services/members-service';
import {Observable} from 'rxjs';
import {Member} from '../../../models/member';
import {AsyncPipe} from '@angular/common';
import {MemberCard} from '../member-card/member-card';

@Component({
  selector: 'app-members-list',
  imports: [
    AsyncPipe,
    MemberCard
  ],
  templateUrl: './members-list.html',
  styleUrl: './members-list.css',
})
export class MembersList {
  private membersService = inject(MembersService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.membersService.getMembers();
  }
}
