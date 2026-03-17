// GetVehiculos Use Case - Single Responsibility Principle

import { Vehiculo } from '../../domain/models/Vehiculo';
import { VehiculoRepository } from '../../data/repositories/VehiculoRepository';

export class GetVehiculos {
  private repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Vehiculo[]> {
    return await this.repository.getAll();
  }
}
