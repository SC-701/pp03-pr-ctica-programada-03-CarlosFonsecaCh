// VehiculoList Component - Presentación de lista de vehículos con Cards

import { Vehiculo } from '../../domain/models/Vehiculo';

interface VehiculoListProps {
  vehiculos: Vehiculo[];
  loading: boolean;
  error: string | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDetail?: (id: string) => void;
}

export const VehiculoList = ({ vehiculos, loading, error, onEdit, onDelete, onViewDetail }: VehiculoListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando vehículos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <strong className="font-bold text-red-800">Error al cargar los datos</strong>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (vehiculos.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 p-12 rounded-2xl shadow-lg text-center">
        <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No hay vehículos registrados</h3>
        <p className="text-gray-600">Comienza agregando tu primer vehículo al sistema</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehiculos.map((vehiculo) => (
        <div 
          key={vehiculo.id} 
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group"
        >
          {/* Imagen de Vehículo */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-60 flex items-center justify-center overflow-hidden">
              <svg className="w-40 h-40 text-gray-400 group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full font-semibold">
              {vehiculo.anio}
            </span>
            <span className="absolute top-3 left-3 bg-white text-gray-900 text-sm px-3 py-1 rounded-full font-bold tracking-wider shadow-md">
              {vehiculo.placa}
            </span>
          </div>

          {/* Contenido */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{vehiculo.marca} {vehiculo.modelo}</h3>
            <p className="text-sm text-gray-500 mb-2">Color: {vehiculo.color}</p>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold text-green-600">
                ${vehiculo.precio.toLocaleString('es-CR')}
              </span>
              
              <div className="flex gap-2">
                {onViewDetail && (
                  <button
                    onClick={() => onViewDetail(vehiculo.id)}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm font-medium"
                    title="Ver detalles"
                  >
                    Ver
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(vehiculo.id)}
                    className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(vehiculo.id)}
                    className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
