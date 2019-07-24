import { Component, OnInit } from '@angular/core';
import { Book, Page, Media } from '../../sdk/book_pb';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../service/api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  book = new Book();
  books: Book[];
  formData = new FormData();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.books = []
    let stream = apiService.bookClient.list((new Book), apiService.metaData);
    stream.on('data', response => {
      this.books.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  addPage() {
    let page = new Page();
    this.book.pageList.push(page);
  }

  onCover(event) {
    const file = event.target.files[0];
    let media = new Media();
    media.url = this.book.title + '/' + file.name
    this.book.cover = media;//{ url: this.book.title + '/' + file.name }
    this.formData.append('uploadfile', file, file.name);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    for (let page of this.book.pageList) {
      if (page.name + '-pic' == event.target.id) {
        let media = new Media();
        media.url = this.book.title + '/' + file.name
        page.picture = media;//{ url: this.book.title + '/' + file.name };
      }
      if (page.name + '-sound' == event.target.id) {
        let media = new Media();
        media.url = this.book.title + '/' + file.name
        page.sound = media;//{ url: this.book.title + '/' + file.name };
      }
      console.log(page.name);
    }
    this.formData.append('uploadfile', file, file.name);
  }

  submit() {
    // upload firstly
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, { params: { title: this.book.title } }).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );

    apiService.bookClient.add(this.book, apiService.metaData, (err: any, response: Book) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        console.log(response);
      }
    });
    this.ngOnInit();
  }

  deleteBook(book: Book) {
    apiService.bookClient.delete(book, apiService.metaData, (err: any, response: Book) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        console.log(response);
      }
    });
  }
}
