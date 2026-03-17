// DeleteVehiculo Use Case - Single Responsibility Principle

import { VehiculoRepository } from '../../data/repositories/VehiculoRepository';

export class DeleteVehiculo {
  private repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
