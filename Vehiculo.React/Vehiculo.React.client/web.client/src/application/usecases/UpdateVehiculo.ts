// UpdateVehiculo Use Case - Single Responsibility Principle

import { VehiculoRequest } from '../../domain/models/Vehiculo';
import { VehiculoRepository } from '../../data/repositories/VehiculoRepository';

export class UpdateVehiculo {
  private repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  async execute(id: string, vehiculo: VehiculoRequest): Promise<boolean> {
    return await this.repository.update(id, vehiculo);
  }
}
