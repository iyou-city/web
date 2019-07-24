import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArticlesClient } from '../../sdk/article_grpc_web_pb';
import { BooksClient } from '../../sdk/book_grpc_web_pb';
import { UsersClient } from '../../sdk/user_grpc_web_pb';
import { GroupsClient } from '../../sdk/group_grpc_web_pb';
import { MessagesClient } from '../../sdk/message_grpc_web_pb';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  articleClient = new ArticlesClient(environment.apiUrl,null,null);
  userClient = new UsersClient(environment.apiUrl,null,null);
  groupClient = new GroupsClient(environment.apiUrl,null,null);
  messageClient = new MessagesClient(environment.apiUrl,null,null);
  bookClient = new BooksClient(environment.apiUrl,null,null);

  metaData = { 'authorization-token': 'admin' };
}

export const apiService = new ApiService();