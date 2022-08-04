import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Candidat } from '../models/candidat.model';

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

  constructor() {}

  public getCandidats$(): Observable<>;
}
