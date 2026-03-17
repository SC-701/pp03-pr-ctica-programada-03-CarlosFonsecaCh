// ModeloRepository Interface

import { Modelo } from '../../domain/models/Modelo';

export interface ModeloRepository {
  getByMarca(idMarca: string): Promise<Modelo[]>;
}
