import { Injectable } from '@angular/core';
import { of, Observable, map } from 'rxjs';
import { Candidat } from '../models/candidat.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CandidatsService {
  public candidats$: Candidat[] = [
    {
      id: 1,
      name: 'Doe',
      firstname: 'John',
      statut: 'En Cours',
      desc: 'A compléter',
      date: new Date('09-26-2022'),
    },
    {
      id: 2,
      name: 'Toto',
      firstname: 'Toto',
      statut: 'Réponse Positive',
      desc: 'Sérieux, aimable et curieux',
      date: new Date('01-14-2021'),
    },
    {
      id: 3,
      name: 'EscrotDuBar',
      firstname: 'Pablo',
      statut: 'Réponse Négative',
      desc: "Arrive en retard et n'est pas très poli",
      date: new Date('12-08-2020'),
    },
  ];

  constructor(protected httpclient: HttpClient) {}

  public getCandidats$(): Observable<Candidat[]> {
    //return this.httpclient.get('/candidats')
    return of(this.candidats$).pipe(
      map((candidats: any) =>
        candidats.map((candidat: any): Candidat => candidat as Candidat)
      )
    );
  }
}
