// useUpdateVehiculo - Hook para actualizar vehículos

import { useState, useCallback } from 'react';
import { VehiculoRequest } from '../../domain/models/Vehiculo';
import { FetchHttpClient } from '../../data/http/FetchHttpClient';
import { VehiculoRepositoryImpl } from '../../data/repositories/VehiculoRepositoryImpl';
import { UpdateVehiculo } from '../../application/usecases/UpdateVehiculo';
import { API_BASE_URL } from '../../config/apiConfig';

export const useUpdateVehiculo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateVehiculo = useCallback(async (id: string, vehiculo: VehiculoRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('useUpdateVehiculo - ID:', id);
      console.log('useUpdateVehiculo - Datos:', vehiculo);
      
      const httpClient = new FetchHttpClient(API_BASE_URL);
      const repository = new VehiculoRepositoryImpl(httpClient);
      const useCase = new UpdateVehiculo(repository);

      await useCase.execute(id, vehiculo);
      
      console.log('useUpdateVehiculo - Actualización exitosa');
      
      setSuccess(true);
      setLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el vehículo';
      console.error('useUpdateVehiculo - Error:', errorMessage);
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  }, []);

  return {
    updateVehiculo,
    loading,
    error,
    success,
  };
};
