// DetailVehiculoPage - Página de detalle de vehículo

import { useNavigate, useParams } from 'react-router-dom';
import { useVehiculoById } from '../hooks/useVehiculoById';

export const DetailVehiculoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { vehiculo, loading, error } = useVehiculoById(id || '');

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando detalles del vehículo...</p>
        </div>
      </section>
    );
  }

  if (error || !vehiculo) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <strong className="font-bold text-red-800">Error</strong>
            </div>
            <p className="text-red-700">{error || 'No se encontró el vehículo'}</p>
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
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de volver */}
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al listado
        </button>

        {/* Tarjeta de detalle */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Hero Section con imagen */}
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-64 h-64 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            {/* Placa flotante */}
            <div className="absolute top-6 left-6">
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl font-bold text-gray-900 tracking-wider">{vehiculo.placa}</span>
              </div>
            </div>
            {/* Año flotante */}
            <div className="absolute top-6 right-6">
              <div className="bg-black text-white px-5 py-2 rounded-full font-semibold text-lg">
                {vehiculo.anio}
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {vehiculo.marca} {vehiculo.modelo}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  Color: {vehiculo.color}
                </span>
              </div>
            </div>

            {/* Precio destacado */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-1">Precio</p>
              <p className="text-4xl font-bold text-green-600">
                ${vehiculo.precio.toLocaleString('es-CR')}
              </p>
            </div>

            {/* Información del propietario */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Información del Propietario</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Correo Electrónico</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {vehiculo.correoPropietario}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {vehiculo.telefonoPropietario}
                  </p>
                </div>
              </div>
            </div>

            {/* Estado de validaciones */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Estado del Vehículo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-xl p-4 border-2 ${vehiculo.revisionValida ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-3">
                    {vehiculo.revisionValida ? (
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <div>
                      <p className={`font-bold ${vehiculo.revisionValida ? 'text-green-800' : 'text-red-800'}`}>
                        Revisión Técnica
                      </p>
                      <p className={`text-sm ${vehiculo.revisionValida ? 'text-green-600' : 'text-red-600'}`}>
                        {vehiculo.revisionValida ? 'Válida y actualizada' : 'Requiere actualización'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`rounded-xl p-4 border-2 ${vehiculo.registroValido ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-3">
                    {vehiculo.registroValido ? (
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <div>
                      <p className={`font-bold ${vehiculo.registroValido ? 'text-green-800' : 'text-red-800'}`}>
                        Registro Nacional
                      </p>
                      <p className={`text-sm ${vehiculo.registroValido ? 'text-green-600' : 'text-red-600'}`}>
                        {vehiculo.registroValido ? 'Documentación al día' : 'Requiere actualización'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate(`/editar/${vehiculo.id}`)}
                className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar Vehículo
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition font-semibold"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
