import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PostDto } from './post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("post-created")
  async listenPostCreate(@Payload() post: PostDto): Promise<string> {
    return await this.appService.listenPostCreate(post);
  }
}
