import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsResponse } from './dto/cards-response.dto';
import { DeckResponse } from './dto/deck-response.dto';

@Injectable()
export class DeckOfCardsService {
  private readonly BASE_URL: string = 'https://deckofcardsapi.com/api/';

  public constructor(private http: HttpClient) {}

  public shuffleDeck(deckId: string = null, deckCount: number = 1): Observable<DeckResponse> {
    if (!deckId) {
      deckId = 'new';
    }

    const url = `${this.BASE_URL}deck/${deckId}/shuffle/`;
    let params: HttpParams = new HttpParams();
    if (deckId === 'new' && deckCount > 1) {
      params = params.set('count', deckCount.toString());
    }

    return this.http.get<DeckResponse>(url, {params: params});
  }

  public drawCards(deckId: string, cardCount: number = 1): Observable<CardsResponse> {
    const url = `${this.BASE_URL}deck/${deckId}/draw/`;
    let params: HttpParams = new HttpParams();
    if (cardCount > 1) {
      params = params.set('count', cardCount.toString());
    }

    return this.http.get<CardsResponse>(url, {params: params});
  }
}
