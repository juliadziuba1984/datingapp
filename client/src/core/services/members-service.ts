import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Member, Photo} from '../../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);

  getMembers() {
    return this.http.get<Member[]>(environment.baseUrl + 'members',);
  }

  getMember(id: string) {
    return this.http.get<Member | null>(environment.baseUrl + 'members/' + id,);
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(environment.baseUrl + 'members/' + id + '/photos',);
  }
}
