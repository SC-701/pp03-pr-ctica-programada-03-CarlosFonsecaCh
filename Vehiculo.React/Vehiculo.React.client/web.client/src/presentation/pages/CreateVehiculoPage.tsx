// CreateVehiculoPage - Página de creación de vehículos

import { useNavigate } from 'react-router-dom';
import { VehiculoForm } from '../components/VehiculoForm';
import { useCreateVehiculo } from '../hooks/useCreateVehiculo';
import { VehiculoRequest } from '../../domain/models/Vehiculo';

export const CreateVehiculoPage = () => {
  const navigate = useNavigate();
  const { createVehiculo, loading, error, success } = useCreateVehiculo();

  const handleSubmit = async (vehiculo: VehiculoRequest) => {
    const result = await createVehiculo(vehiculo);
    if (result) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <section className="flex items-center justify-center py-12 px-4 min-h-screen bg-gray-50 relative">
      {/* Overlay de bloqueo durante redirección */}
      {success && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Vehículo creado!</h3>
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
            Registrar Vehículo
          </h1>
          <p className="text-sm/6 text-gray-600 text-center md:text-start mx-auto md:mx-0 mb-8 leading-relaxed max-w-[400px]">
            Complete el formulario con la información del vehículo que desea agregar al inventario.
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
                  <p className="text-green-700 text-sm mt-0.5">Vehículo creado correctamente. Redirigiendo...</p>
                </div>
              </div>
            </div>
          )}

          <VehiculoForm onSubmit={handleSubmit} loading={loading || success} />
        </div>

        {/* Imagen decorativa */}
        <div className="rounded-3xl relative min-h-[662px] w-full max-w-[520px] hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-10">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col justify-center h-full">
            <div className="text-white">
              <svg className="w-32 h-32 mx-auto mb-8 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <h2 className="text-2xl font-semibold mb-4 text-center">Sistema de Gestión de Vehículos</h2>
              <p className="text-sm/6 mb-6 text-center opacity-90 max-w-[400px] mx-auto">
                Administra tu inventario de forma eficiente con nuestro sistema de gestión. Registra, edita y visualiza todos tus vehículos en un solo lugar.
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
