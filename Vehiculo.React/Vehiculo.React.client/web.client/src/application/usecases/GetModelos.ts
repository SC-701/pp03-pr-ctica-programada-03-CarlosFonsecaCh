// GetModelos Use Case

import { Modelo } from '../../domain/models/Modelo';
import { ModeloRepository } from '../../data/repositories/ModeloRepository';

export class GetModelos {
  private repository: ModeloRepository;

  constructor(repository: ModeloRepository) {
    this.repository = repository;
  }

  async execute(idMarca: string): Promise<Modelo[]> {
    return await this.repository.getByMarca(idMarca);
  }
}
