import { Component, Input } from '@angular/core';
import { Volume } from '../GoogleBooks/models/volume.interface';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() volume: Volume | null = null;
  @Input() sessionId: string = "";

  public placeholderImageUrl = 'http://placehold.jp/e0e0e0/ffffff/250x250.png?text=No%20image';

  constructor() {

  }
}
