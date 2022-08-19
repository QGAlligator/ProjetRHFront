export interface Candidat {
  id: number;
  name: string;
  firstname: string;
  statut: string;
  desc: string;
  date: Date;
}

export interface Meta {
  limit: number;
  total: number;
  offset: number;
}

export interface ApiResponse {
  data: Candidat[];
  meta: Meta[];
}
