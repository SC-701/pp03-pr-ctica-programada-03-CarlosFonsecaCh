// GetVehiculoById Use Case - Single Responsibility Principle

import { VehiculoDetalle } from '../../domain/models/Vehiculo';
import { VehiculoRepository } from '../../data/repositories/VehiculoRepository';

export class GetVehiculoById {
  private repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<VehiculoDetalle> {
    return await this.repository.getById(id);
  }
}
