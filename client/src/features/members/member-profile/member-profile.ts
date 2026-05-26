import {
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditableMember, Member} from '../../../models/member';
import {DatePipe} from '@angular/common';
import {AccountService} from '../../../core/services/account-service';
import MembersService from '../../../core/services/members-service';
import {ToastService} from '../../../core/services/toast-service';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-member-profile',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(event: BeforeUnloadEvent) {
    if(this.editForm?.dirty) {
      event.preventDefault();
    }
  }
  private route = inject(ActivatedRoute);
  protected memberService = inject(MembersService);
  private accountService = inject(AccountService);
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.parent?.snapshot.paramMap.get('id');
  })
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    country: '',
    city: '',
  };
  private toast = inject(ToastService);

  constructor() {

  }

  ngOnInit() {
    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      country: this.memberService.member()?.country || '',
      city: this.memberService.member()?.city || '',
    }
  }

  updateProfile() {
    if (!this.memberService.member()) return;
    const updatedMember = {...this.memberService.member(), ...this.editableMember};
    this.memberService.updateMember(updatedMember).subscribe({
      next: (response) => {
        this.editForm?.resetForm(updatedMember);
      },
      error: (error) => {
        console.error(error);
      },
    })
    const currentUser = this.accountService.currentUser();
    if(currentUser && currentUser?.displayName!== this.accountService.currentUser()?.displayName){
      currentUser.displayName = this.editableMember.displayName;
      this.accountService.currentUser.set(currentUser);
    }
    this.toast.success('Profile updated successfully');
    this.memberService.editMode.set(false);
    this.memberService.member.set(updatedMember as Member);
  }

  ngOnDestroy() {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
