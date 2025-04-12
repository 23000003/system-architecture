import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostsService {
  constructor(@Inject('POST_SERVICE') private rClient: ClientProxy) {}
  create(createPostDto: CreatePostDto) {
    this.rClient.emit('post-created', createPostDto);
    return "createPostDto"
  }

  findAll() {
    return `This action returns all posts`;
  }
}
