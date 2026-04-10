import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Member} from '../../../models/member';
import {AsyncPipe} from '@angular/common';
import {AgePipe} from '../../../core/pipes/age-pipe';

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
  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member.set(data['member']);
    })
  }
}
