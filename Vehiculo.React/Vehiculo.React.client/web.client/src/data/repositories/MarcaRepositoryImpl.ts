// MarcaRepositoryImpl - Implementación concreta

import { HttpClient } from '../http/HttpClient';
import { Marca } from '../../domain/models/Marca';
import { MarcaRepository } from './MarcaRepository';

export class MarcaRepositoryImpl implements MarcaRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAll(): Promise<Marca[]> {
    return await this.httpClient.get<Marca[]>('/api/Marca');
  }
}
