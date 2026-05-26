import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Member} from '../../../models/member';
import {AgePipe} from '../../../core/pipes/age-pipe';
import MembersService from '../../../core/services/members-service';

@Component({
  selector: 'app-member-detailes',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AgePipe
  ],
  templateUrl: './member-detailes.html',
  styleUrl: './member-detailes.css',
})
export class MemberDetailes implements OnInit {
  protected memberService = inject(MembersService);

  ngOnInit(): void {

  }
}
