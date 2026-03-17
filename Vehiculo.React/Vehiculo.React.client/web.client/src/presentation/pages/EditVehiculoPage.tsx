// EditVehiculoPage - Página de edición de vehículos

import { useNavigate, useParams } from 'react-router-dom';
import { VehiculoForm } from '../components/VehiculoForm';
import { useUpdateVehiculo } from '../hooks/useUpdateVehiculo';
import { useVehiculoById } from '../hooks/useVehiculoById';
import { VehiculoRequest } from '../../domain/models/Vehiculo';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/apiConfig';

interface ModeloApi {
  id: string;
  nombre: string;
  idMarca: string;
}

export const EditVehiculoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  console.log('EditVehiculoPage - ID recibido:', id);
  
  const { vehiculo, loading: loadingVehiculo, error: errorVehiculo } = useVehiculoById(id || '');
  const { updateVehiculo, loading, error, success } = useUpdateVehiculo();
  const [idMarca, setIdMarca] = useState<string>('');
  const [idModelo, setIdModelo] = useState<string>('');

  // Cargar idMarca e idModelo cuando se carga el vehículo
  useEffect(() => {
    if (vehiculo) {
      const fetchModeloInfo = async () => {
        try {
          // Primero cargar todas las marcas
          const responseMarcas = await fetch(`${API_BASE_URL}/api/Marca`);
          const marcas: { id: string; nombre: string }[] = await responseMarcas.json();
          
          // Buscar la marca que coincida con el nombre del vehículo
          const marcaEncontrada = marcas.find((m) => m.nombre === vehiculo.marca);
          
          if (!marcaEncontrada) {
            console.error('No se encontró la marca:', vehiculo.marca);
            return;
          }
          
          setIdMarca(marcaEncontrada.id);
          
          // Ahora cargar los modelos de esa marca
          const responseModelos = await fetch(`${API_BASE_URL}/api/Modelo/${marcaEncontrada.id}`);
          
          if (responseModelos.status === 204) {
            console.error('No hay modelos para esta marca');
            return;
          }
          
          const modelos: ModeloApi[] = await responseModelos.json();
          
          // Buscar el modelo que coincida con el nombre del vehículo
          const modelo = modelos.find((m) => m.nombre === vehiculo.modelo);
          
          if (modelo) {
            setIdModelo(modelo.id);
          } else {
            console.error('No se encontró el modelo:', vehiculo.modelo);
          }
        } catch (err) {
          console.error('Error al cargar información del modelo:', err);
        }
      };
      fetchModeloInfo();
    }
  }, [vehiculo]);

  const handleSubmit = async (vehiculoData: VehiculoRequest) => {
    if (!id) return;
    
    const result = await updateVehiculo(id, vehiculoData);
    if (result) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (loadingVehiculo) {
    return (
      <section className="flex items-center justify-center py-12 px-4 min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando información del vehículo...</p>
        </div>
      </section>
    );
  }

  if (errorVehiculo || !vehiculo) {
    return (
      <section className="flex items-center justify-center py-12 px-4 min-h-screen bg-gray-50">
        <div className="max-w-md w-full">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <strong className="font-bold text-red-800">Error</strong>
            </div>
            <p className="text-red-700">{errorVehiculo || 'No se encontró el vehículo'}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-red-600 hover:text-red-800 font-medium"
            >
              ← Volver al listado
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center py-12 px-4 min-h-screen bg-gray-50 relative">
      {/* Overlay de bloqueo durante redirección */}
      {success && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Vehículo actualizado!</h3>
              <p className="text-gray-600">Redirigiendo al listado...</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">
        {/* Formulario */}
        <div className="p-5">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al listado
          </button>

          <h1 className="text-3xl font-semibold text-gray-900 text-center md:text-start mb-3 tracking-tight">
            Editar Vehículo
          </h1>
          <p className="text-sm/6 text-gray-600 text-center md:text-start mx-auto md:mx-0 mb-8 leading-relaxed max-w-[400px]">
            Actualiza la información del vehículo <span className="font-bold">{vehiculo.placa}</span>
          </p>

          {error && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="font-semibold text-red-800 text-sm">Error</strong>
                  <p className="text-red-700 text-sm mt-0.5">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="font-semibold text-green-800 text-sm">¡Éxito!</strong>
                  <p className="text-green-700 text-sm mt-0.5">Vehículo actualizado correctamente. Redirigiendo...</p>
                </div>
              </div>
            </div>
          )}

          <VehiculoForm 
            onSubmit={handleSubmit} 
            loading={loading || success}
            initialValues={{
              placa: vehiculo.placa,
              color: vehiculo.color,
              anio: vehiculo.anio,
              precio: vehiculo.precio,
              correoPropietario: vehiculo.correoPropietario,
              telefonoPropietario: vehiculo.telefonoPropietario,
              idModelo: idModelo,
              idMarca: idMarca,
            }}
          />
        </div>

        {/* Imagen decorativa */}
        <div className="rounded-3xl relative min-h-[662px] w-full max-w-[520px] hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-10">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col justify-center h-full">
            <div className="text-white">
              <svg className="w-32 h-32 mx-auto mb-8 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
              <h2 className="text-2xl font-semibold mb-4 text-center">Actualizar Información</h2>
              <p className="text-sm/6 mb-6 text-center opacity-90 max-w-[400px] mx-auto">
                Mantén actualizada la información de tus vehículos para un mejor control de tu inventario.
              </p>
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
