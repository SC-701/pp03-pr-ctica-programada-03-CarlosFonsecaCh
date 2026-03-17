// CreateVehiculo Use Case - Single Responsibility Principle

import { VehiculoRequest } from '../../domain/models/Vehiculo';
import { VehiculoRepository } from '../../data/repositories/VehiculoRepository';

export class CreateVehiculo {
  private repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  async execute(vehiculo: VehiculoRequest): Promise<string> {
    return await this.repository.create(vehiculo);
  }
}
