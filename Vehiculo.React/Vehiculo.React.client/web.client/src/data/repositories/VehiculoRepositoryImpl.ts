// VehiculoRepositoryImpl - Implementación concreta del repositorio

import { HttpClient } from '../http/HttpClient';
import { Vehiculo, VehiculoRequest, VehiculoDetalle } from '../../domain/models/Vehiculo';
import { VehiculoRepository } from './VehiculoRepository';

export class VehiculoRepositoryImpl implements VehiculoRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAll(): Promise<Vehiculo[]> {
    return await this.httpClient.get<Vehiculo[]>('/api/Vehiculo');
  }

  async getById(id: string): Promise<VehiculoDetalle> {
    return await this.httpClient.get<VehiculoDetalle>(`/api/Vehiculo/${id}`);
  }

  async create(vehiculo: VehiculoRequest): Promise<string> {
    const response = await this.httpClient.post<string>('/api/Vehiculo', vehiculo);
    return response;
  }

  async update(id: string, vehiculo: VehiculoRequest): Promise<boolean> {
    await this.httpClient.put<boolean>(`/api/Vehiculo/${id}`, vehiculo);
    return true;
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/api/Vehiculo/${id}`);
  }
}
