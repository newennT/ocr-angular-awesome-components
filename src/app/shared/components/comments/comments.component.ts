import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Comment } from 'src/app/core/models/comment.model';
import { animate, transition, trigger, useAnimation } from '@angular/animations';
import { state, style, query, sequence, group, stagger, animateChild } from '@angular/animations';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('200ms ease-in')
      ]),
      transition('active => default', [
        animate('200ms ease-out')
      ]),
      transition(':enter', [
        query('.comment-text, .comment-date', [
          style({
              opacity: 0
          }),
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            startColor: 'rgb(201, 157, 242)',
            time: '500ms'
          }
        }),
        group([
          sequence([
            useAnimation(flashAnimation, {
              params: { time: '500ms', flashColor: 'rgb(201, 157, 242)' }
            })
          ]),
          query('.comment-text', [
              animate('250ms', style({
                  opacity: 1
              }))
          ]),
          query('.comment-date', [
              animate('500ms', style({
                  opacity: 1
              }))
          ]),
      ]),

    ])

    ]),
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ])
  ]
  
})
export class CommentsComponent implements OnInit {

  commentCtrl!: FormControl;
  listItemAnimationState = 'default';
  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(formBuilder: FormBuilder){}

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  ngOnInit(): void {
    this.commentCtrl = new FormControl('', [Validators.required, Validators.minLength(10)]);
    for(let index in this.comments){
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid){
      return;
    } 
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    });

    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
    
  }


  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }



}
