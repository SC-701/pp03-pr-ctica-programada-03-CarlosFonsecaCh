// useDeleteVehiculo - Hook para eliminar vehículos

import { useState, useCallback } from 'react';
import { FetchHttpClient } from '../../data/http/FetchHttpClient';
import { VehiculoRepositoryImpl } from '../../data/repositories/VehiculoRepositoryImpl';
import { DeleteVehiculo } from '../../application/usecases/DeleteVehiculo';
import { API_BASE_URL } from '../../config/apiConfig';

export const useDeleteVehiculo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteVehiculo = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const httpClient = new FetchHttpClient(API_BASE_URL);
      const repository = new VehiculoRepositoryImpl(httpClient);
      const useCase = new DeleteVehiculo(repository);

      await useCase.execute(id);
      
      setLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el vehículo';
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  }, []);

  return {
    deleteVehiculo,
    loading,
    error,
  };
};
