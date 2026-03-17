// VehiculosPage - Página principal de listado de vehículos

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehiculos } from '../hooks/useVehiculos';
import { useDeleteVehiculo } from '../hooks/useDeleteVehiculo';
import { usePagination } from '../hooks/usePagination';
import { VehiculoList } from '../components/VehiculoList';
import { Pagination } from '../components/Pagination';

export const VehiculosPage = () => {
  const navigate = useNavigate();
  const { vehiculos, loading, error, refresh } = useVehiculos();
  const { deleteVehiculo, loading: deleting } = useDeleteVehiculo();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehiculoToDelete, setVehiculoToDelete] = useState<string | null>(null);
  
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    itemsPerPage,
    totalItems,
    resetPagination,
  } = usePagination({ items: vehiculos, itemsPerPage: 12 });

  const handleEdit = (id: string) => {
    navigate(`/editar/${id}`);
  };

  const handleDelete = (id: string) => {
    setVehiculoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (vehiculoToDelete) {
      const success = await deleteVehiculo(vehiculoToDelete);
      if (success) {
        // Actualizar la lista después de eliminar
        refresh();
      }
      setShowDeleteModal(false);
      setVehiculoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setVehiculoToDelete(null);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/detalle/${id}`);
  };

  const handleRefresh = () => {
    resetPagination();
    refresh();
  };

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Explora Nuestro Inventario de Vehículos
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Los mejores vehículos al mejor precio. Encuentra el auto perfecto para ti con nuestro amplio catálogo.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/crear')}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all font-semibold"
          >
            Agregar Vehículo
          </button>
          <button 
            onClick={handleRefresh}
            className="bg-white text-gray-700 px-8 py-3.5 rounded-xl hover:bg-gray-50 transition border border-gray-300 font-semibold"
          >
            Actualizar Lista
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      {!loading && !error && vehiculos.length > 0 && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Vehículos</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Actualizado: {new Date().toLocaleString('es-CR', { 
                day: '2-digit', 
                month: 'short', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <VehiculoList 
          vehiculos={paginatedItems} 
          loading={loading} 
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
        />

        {/* Paginación */}
        {!loading && !error && vehiculos.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        )}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            {/* Icono de Advertencia */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Título y Mensaje */}
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
              ¿Eliminar Vehículo?
            </h3>
            <p className="text-gray-600 text-center mb-8">
              Esta acción no se puede deshacer. El vehículo será eliminado permanentemente del sistema.
            </p>

            {/* Botones */}
            <div className="flex gap-4">
              <button
                onClick={cancelDelete}
                disabled={deleting}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 bg-gradient-to-br from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-[0_10px_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Eliminando...
                  </>
                ) : (
                  'Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
