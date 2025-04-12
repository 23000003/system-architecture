import { Injectable } from '@nestjs/common';
import { PostDto } from './post.dto';
import axios from 'axios';

interface GraphQLResponse {
  data: {
    createPost: PostDto;
  };
}

@Injectable()
export class AppService {
  async listenPostCreate(post: PostDto): Promise<string> {
    console.log(post);

    try {
      const res = await axios.post<GraphQLResponse>('http://localhost:4001/graphql', {
        query: `
          mutation CreatePost($title: String!, $content: String!, $authorId: Int!) {
            createPost(title: $title, content: $content, authorId: $authorId) {
              id
              title
              content
              authorId
            }
          }
        `,
        variables: {
          title: post.title,
          content: post.content,
          authorId: post.authorId,
        },
      });
      const data = res.data;
      console.log(data);
      return 'Post Created!';
    } catch (e) {
      console.error(e);
      return (e as Error).message;
    }
  }
}
