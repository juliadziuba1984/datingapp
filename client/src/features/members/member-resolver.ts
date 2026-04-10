import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {MembersService} from '../../core/services/members-service';
import {Member} from '../../models/member';
import {EMPTY, Observable} from 'rxjs';

export const memberResolver: ResolveFn<Member | Observable<any>> = (route) => {
  const memberService = inject(MembersService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }
  return memberService.getMember(id);
};
