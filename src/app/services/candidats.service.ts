import { Injectable } from '@angular/core';
import { of, Observable, map } from 'rxjs';
import { ApiResponse, Candidat, Meta } from '../models/candidat.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CandidatsService {
  public candidats: Candidat[] = [
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

  public meta: Meta[] = [
    {
      limit: 20,
      total: this.candidats.length,
      offset: 0,
    },
  ];

  public ApiResponse$: ApiResponse = {
    data: this.candidats,
    meta: this.meta,
  };

  public getCandidats$(): Observable<ApiResponse> {
    return of(this.ApiResponse$).pipe(
      map((response: any): ApiResponse => response as ApiResponse)
    );
  }

  public getCandidatsById$(_id: number): Observable<Candidat> {
    let index = 0;
    while (_id != this.candidats[index].id) {
      index++;
    }
    return of(this.candidats[index]).pipe(
      map((response: any): Candidat => response as Candidat)
    );
  }
}
