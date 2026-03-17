// Custom Hook para crear vehículos

import { useState, useMemo, useCallback } from 'react';
import { VehiculoRequest } from '../../domain/models/Vehiculo';
import { CreateVehiculo } from '../../application/usecases/CreateVehiculo';
import { FetchHttpClient } from '../../data/http/FetchHttpClient';
import { VehiculoRepositoryImpl } from '../../data/repositories/VehiculoRepositoryImpl';
import { API_CONFIG } from '../../config/apiConfig';

export const useCreateVehiculo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Dependency Injection
  const createVehiculoUseCase = useMemo(() => {
    const httpClient = new FetchHttpClient(API_CONFIG.BASE_URL);
    const repository = new VehiculoRepositoryImpl(httpClient);
    return new CreateVehiculo(repository);
  }, []);

  const createVehiculo = useCallback(async (vehiculo: VehiculoRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createVehiculoUseCase.execute(vehiculo);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear vehículo');
      setSuccess(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, [createVehiculoUseCase]);

  const resetStatus = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    createVehiculo,
    loading,
    error,
    success,
    resetStatus,
  };
};
