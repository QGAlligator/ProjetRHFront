import { Injectable } from '@angular/core';
import { of, Observable, map, take } from 'rxjs';
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
      date: '2022-09-26',
    },
    {
      id: 2,
      name: 'Toto',
      firstname: 'Toto',
      statut: 'Réponse Positive',
      desc: 'Sérieux, aimable et curieux',
      date: '2021-01-14',
    },
    {
      id: 3,
      name: 'EscrotDuBar',
      firstname: 'Pablo',
      statut: 'Réponse Négative',
      desc: "Arrive en retard et n'est pas très poli",
      date: '2020-08-12',
    },
  ];

  public getCandidats$(): Observable<ApiResponse> {
    return of(this.candidats).pipe(
      map((response: any): ApiResponse => {
        return {
          data: this.candidats,
          meta: {
            limit: 2,
            total: this.candidats.length,
            offset: 0,
          },
        } as ApiResponse;
      }),
      take(1) // Pour simuler le désabonnement automatique de l'observable
    );
  }

  public getCandidatsById$(id: number): Observable<Candidat> {
    const candidat: Candidat | undefined = this.candidats.find(
      (candidat: Candidat): boolean => candidat.id === id
    );

    return of(candidat || ({} as Candidat)).pipe(take(1));
  }

  public deleteCandidat$(id: number): Observable<number> {
    this.candidats = this.candidats.filter(
      (candidat: Candidat): boolean => candidat.id !== id
    );

    return of(id).pipe(take(1));
  }
}
