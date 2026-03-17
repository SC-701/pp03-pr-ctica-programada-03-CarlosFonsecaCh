// Domain Models - Entidades del negocio

export interface Vehiculo {
  id: string;
  placa: string;
  color: string;
  anio: number;
  precio: number;
  correoPropietario: string;
  telefonoPropietario: string;
  modelo: string;
  marca: string;
}

export interface VehiculoRequest {
  placa: string;
  color: string;
  anio: number;
  precio: number;
  correoPropietario: string;
  telefonoPropietario: string;
  idModelo: string;
}

export interface VehiculoDetalle extends Vehiculo {
  revisionValida: boolean;
  registroValido: boolean;
}
