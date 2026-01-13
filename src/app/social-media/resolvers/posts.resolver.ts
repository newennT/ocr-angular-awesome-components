import { Injectable } from "@angular/core";
import { PostsService } from '../services/posts.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../../core/models/post.model";

@Injectable()
export class PostsResolver implements Resolve<Post[]> {
    constructor(private PostsService: PostsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
        return this.PostsService.getPosts();
    }
}