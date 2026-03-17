// Custom Hook para manejar marcas y modelos

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Marca } from '../../domain/models/Marca';
import { Modelo } from '../../domain/models/Modelo';
import { GetMarcas } from '../../application/usecases/GetMarcas';
import { GetModelos } from '../../application/usecases/GetModelos';
import { FetchHttpClient } from '../../data/http/FetchHttpClient';
import { MarcaRepositoryImpl } from '../../data/repositories/MarcaRepositoryImpl';
import { ModeloRepositoryImpl } from '../../data/repositories/ModeloRepositoryImpl';
import { API_CONFIG } from '../../config/apiConfig';

export const useMarcasModelos = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [selectedMarca, setSelectedMarca] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dependency Injection
  const getMarcasUseCase = useMemo(() => {
    const httpClient = new FetchHttpClient(API_CONFIG.BASE_URL);
    const repository = new MarcaRepositoryImpl(httpClient);
    return new GetMarcas(repository);
  }, []);

  const getModelosUseCase = useMemo(() => {
    const httpClient = new FetchHttpClient(API_CONFIG.BASE_URL);
    const repository = new ModeloRepositoryImpl(httpClient);
    return new GetModelos(repository);
  }, []);

  const loadMarcas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarcasUseCase.execute();
      setMarcas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar marcas');
      setMarcas([]);
    } finally {
      setLoading(false);
    }
  }, [getMarcasUseCase]);

  const loadModelos = useCallback(async (idMarca: string) => {
    if (!idMarca) {
      setModelos([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getModelosUseCase.execute(idMarca);
      setModelos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar modelos');
      setModelos([]);
    } finally {
      setLoading(false);
    }
  }, [getModelosUseCase]);

  useEffect(() => {
    loadMarcas();
  }, [loadMarcas]);

  useEffect(() => {
    if (selectedMarca) {
      loadModelos(selectedMarca);
    }
  }, [selectedMarca, loadModelos]);

  return {
    marcas,
    modelos,
    selectedMarca,
    setSelectedMarca,
    loading,
    error,
  };
};
