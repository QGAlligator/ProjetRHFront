import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  constructor(protected httpclient: HttpClient) {}

  public getHero$(): Observable<any> {
    return this.httpclient.get(
      'https://gateway.marvel.com/v1/public/characters?ts=123456&apikey=acc24848e2afbe88551d31cbe1e7e2e8&hash=eaab88e75d5db8a187e3d1da0714d120'
    );
    // .pipe(map((heros: any) => heros.map((heros: any): any => heros as any)));
  }
}
// .pipe(
//   map((candidats: any) =>
//     candidats.map((candidat: any): Candidat => candidat as Candidat)
