// Custom Hook para manejar operaciones de vehículos

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Vehiculo } from '../../domain/models/Vehiculo';
import { GetVehiculos } from '../../application/usecases/GetVehiculos';
import { FetchHttpClient } from '../../data/http/FetchHttpClient';
import { VehiculoRepositoryImpl } from '../../data/repositories/VehiculoRepositoryImpl';
import { API_CONFIG } from '../../config/apiConfig';

export const useVehiculos = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dependency Injection - Creación de dependencias (memoizadas para evitar recreación)
  const getVehiculosUseCase = useMemo(() => {
    const httpClient = new FetchHttpClient(API_CONFIG.BASE_URL);
    const repository = new VehiculoRepositoryImpl(httpClient);
    return new GetVehiculos(repository);
  }, []);

  const loadVehiculos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVehiculosUseCase.execute();
      setVehiculos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar vehículos');
      setVehiculos([]);
    } finally {
      setLoading(false);
    }
  }, [getVehiculosUseCase]);

  useEffect(() => {
    loadVehiculos();
  }, [loadVehiculos]);

  return {
    vehiculos,
    loading,
    error,
    refresh: loadVehiculos,
  };
};
