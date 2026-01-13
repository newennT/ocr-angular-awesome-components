import { Component, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number}>();

    onNewComment(comment: string) {
      this.postCommented.emit({ comment, postId: this.post.id });
  }

  ngOnInit(): void {
    
  }
}
