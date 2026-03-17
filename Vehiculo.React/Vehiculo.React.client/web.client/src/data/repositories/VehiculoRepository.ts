// VehiculoRepository Interface - Abstracción de la capa de datos (Interface Segregation Principle)

import { Vehiculo, VehiculoRequest, VehiculoDetalle } from '../../domain/models/Vehiculo';

export interface VehiculoRepository {
  getAll(): Promise<Vehiculo[]>;
  getById(id: string): Promise<VehiculoDetalle>;
  create(vehiculo: VehiculoRequest): Promise<string>;
  update(id: string, vehiculo: VehiculoRequest): Promise<boolean>;
  delete(id: string): Promise<void>;
}
