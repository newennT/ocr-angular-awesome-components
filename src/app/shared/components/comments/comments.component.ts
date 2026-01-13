import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  commentCtrl!: FormControl;

  constructor(formBuilder: FormBuilder){}

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  ngOnInit(): void {
    this.commentCtrl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid){
      return;
    } else {
      this.newComment.emit(this.commentCtrl.value);
      this.commentCtrl.reset();
    }
  }



}
