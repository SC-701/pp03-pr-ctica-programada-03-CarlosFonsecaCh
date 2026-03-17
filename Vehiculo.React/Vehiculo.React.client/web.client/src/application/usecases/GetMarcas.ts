// GetMarcas Use Case

import { Marca } from '../../domain/models/Marca';
import { MarcaRepository } from '../../data/repositories/MarcaRepository';

export class GetMarcas {
  private repository: MarcaRepository;

  constructor(repository: MarcaRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Marca[]> {
    return await this.repository.getAll();
  }
}
