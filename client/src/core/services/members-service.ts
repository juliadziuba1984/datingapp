import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EditableMember, Member, Photo} from '../../models/member';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class MembersService {
  private http = inject(HttpClient);
  editMode = signal(false);
  member = signal<Member | null>(null);

  getMembers() {
    return this.http.get<Member[]>(environment.baseUrl + 'members',);
  }

  getMember(id: string) {
    return this.http.get<Member | null>(environment.baseUrl + 'members/' + id,).pipe(
      tap((member) => {
        if (member) {
          this.member.set(member);
        }
      })
    );
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(environment.baseUrl + 'members/' + id + '/photos',);
  }

  updateMember(member: EditableMember) {
    return this.http.put(environment.baseUrl + 'members', member);
  }
}

export default MembersService
