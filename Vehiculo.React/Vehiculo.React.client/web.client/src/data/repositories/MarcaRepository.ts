// MarcaRepository Interface

import { Marca } from '../../domain/models/Marca';

export interface MarcaRepository {
  getAll(): Promise<Marca[]>;
}
