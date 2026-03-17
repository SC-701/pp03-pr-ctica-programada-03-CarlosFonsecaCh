// useVehiculoById - Hook para obtener un vehículo por ID

import { useState, useEffect } from 'react';
import { VehiculoDetalle } from '../../domain/models/Vehiculo';
import { FetchHttpClient } from '../../data/http/FetchHttpClient';
import { VehiculoRepositoryImpl } from '../../data/repositories/VehiculoRepositoryImpl';
import { GetVehiculoById } from '../../application/usecases/GetVehiculoById';
import { API_BASE_URL } from '../../config/apiConfig';

export const useVehiculoById = (id: string) => {
  const [vehiculo, setVehiculo] = useState<VehiculoDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehiculo = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('useVehiculoById - Buscando ID:', id);
        
        const httpClient = new FetchHttpClient(API_BASE_URL);
        const repository = new VehiculoRepositoryImpl(httpClient);
        const useCase = new GetVehiculoById(repository);

        const data = await useCase.execute(id);
        
        console.log('useVehiculoById - Vehículo encontrado:', data);
        
        setVehiculo(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar el vehículo';
        console.error('useVehiculoById - Error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehiculo();
    }
  }, [id]);

  return {
    vehiculo,
    loading,
    error,
  };
};
