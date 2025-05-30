// Angular Import
import { Component, EventEmitter, Output } from '@angular/core';
import { FriendsList } from 'src/app/fack-db/friends-list';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent {
  @Output() ChatCollapse = new EventEmitter();
  @Output() ChatToggle = new EventEmitter();
  friendsList: any;
  searchFriends!: string;

  constructor() {
    this.friendsList = FriendsList.friends;
  }

  ChatOn() {
    this.ChatToggle.emit();
  }
}
