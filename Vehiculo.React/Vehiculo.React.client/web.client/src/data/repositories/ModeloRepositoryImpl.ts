// ModeloRepositoryImpl - Implementación concreta

import { HttpClient } from '../http/HttpClient';
import { Modelo } from '../../domain/models/Modelo';
import { ModeloRepository } from './ModeloRepository';

export class ModeloRepositoryImpl implements ModeloRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getByMarca(idMarca: string): Promise<Modelo[]> {
    return await this.httpClient.get<Modelo[]>(`/api/Modelo/${idMarca}`);
  }
}
