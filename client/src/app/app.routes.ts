import {Routes} from '@angular/router';
import {Home} from '../features/home/home';
import {MembersList} from '../features/members/members-list/members-list';
import {MemberDetailes} from '../features/members/member-detailes/member-detailes';
import {Lists} from '../features/lists/lists';
import {Messages} from '../features/messages/messages';
import {authGuard} from '../core/guards/auth-guard';
import {NotFound} from '../features/not-found/not-found';
import {MemberProfile} from '../features/members/member-profile/member-profile';
import {MemberPhotos} from '../features/members/member-photos/member-photos';
import {MemberMessages} from '../features/members/member-messages/member-messages';
import {memberResolver} from '../features/members/member-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MembersList,
      },
      {
        path: 'members/:id',
        component: MemberDetailes,
        resolve: {
          member: memberResolver
        },
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            component: MemberProfile
          },
          {
            path: 'photos',
            component: MemberPhotos
          },
          {
            path: 'messages',
            component: MemberMessages
          }
        ]
      },
      {path: 'lists', component: Lists},
      {
        path: 'messages',
        component: Messages,
      },
    ],
  },

  {
    path: '**',
    component: NotFound,
  },
];
