import {Component, inject} from '@angular/core';
import {MembersService} from '../../../core/services/members-service';
import {Observable} from 'rxjs';
import {Photo} from '../../../models/member';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [
    AsyncPipe
  ],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
  private memberService = inject(MembersService);
  protected photos$?: Observable<Photo[]>;
  private route = inject(ActivatedRoute);

  constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.photos$ = this.memberService.getMemberPhotos(memberId);

    }
  }
}
