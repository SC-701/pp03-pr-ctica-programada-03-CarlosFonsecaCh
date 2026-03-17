// VehiculoForm Component - Formulario de creación/edición

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { VehiculoRequest } from '../../domain/models/Vehiculo';
import { useMarcasModelos } from '../hooks/useMarcasModelos';

interface VehiculoFormProps {
  onSubmit: (vehiculo: VehiculoRequest) => void;
  loading: boolean;
  initialValues?: Partial<VehiculoRequest> & { idMarca?: string };
}

export const VehiculoForm = ({ onSubmit, loading, initialValues }: VehiculoFormProps) => {
  const { marcas, modelos, selectedMarca, setSelectedMarca } = useMarcasModelos();
  
  const [formData, setFormData] = useState<VehiculoRequest>({
    placa: '',
    color: '',
    anio: new Date().getFullYear(),
    precio: 0,
    correoPropietario: '',
    telefonoPropietario: '',
    idModelo: '',
  });

  // Cargar valores iniciales para modo edición
  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        ...initialValues,
      }));
      
      // Si hay un idMarca inicial, setear la marca seleccionada
      if (initialValues.idMarca) {
        setSelectedMarca(initialValues.idMarca);
      }
    }
  }, [initialValues, setSelectedMarca]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'anio' || name === 'precio' ? Number(value) : value,
    }));
  };

  const handleMarcaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMarca(e.target.value);
    setFormData(prev => ({ ...prev, idModelo: '' }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placa */}
        <div>
          <label htmlFor="placa" className="block text-sm text-gray-500 mb-2">
            Placa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            pattern="[A-Za-z]{3}-[0-9]{3}"
            placeholder="ABC-123"
            required
            disabled={loading}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-400">Formato: ABC-123</p>
        </div>

        {/* Color */}
        <div>
          <label htmlFor="color" className="block text-sm text-gray-500 mb-2">
            Color <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            minLength={4}
            maxLength={40}
            placeholder="Ej: Rojo, Azul, Negro"
            required
            disabled={loading}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Año */}
        <div>
          <label htmlFor="anio" className="block text-sm text-gray-500 mb-2">
            Año <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="anio"
            name="anio"
            value={formData.anio}
            onChange={handleInputChange}
            min="1900"
            max="2099"
            required
            disabled={loading}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="precio" className="block text-sm text-gray-500 mb-2">
            Precio <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400 text-sm">₡</span>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              required
              disabled={loading}
              className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Marca */}
        <div>
          <label htmlFor="marca" className="block text-sm text-gray-500 mb-2">
            Marca <span className="text-red-500">*</span>
          </label>
          <select
            id="marca"
            value={selectedMarca}
            onChange={handleMarcaChange}
            required
            disabled={loading}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none cursor-pointer bg-white focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Seleccione una marca</option>
            {marcas.map(marca => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Modelo */}
        <div>
          <label htmlFor="idModelo" className="block text-sm text-gray-500 mb-2">
            Modelo <span className="text-red-500">*</span>
          </label>
          <select
            id="idModelo"
            name="idModelo"
            value={formData.idModelo}
            onChange={handleInputChange}
            required
            disabled={loading || !selectedMarca || modelos.length === 0}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none cursor-pointer bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-indigo-500 transition-colors"
          >
            <option value="">Seleccione un modelo</option>
            {modelos.map(modelo => (
              <option key={modelo.id} value={modelo.id}>
                {modelo.nombre}
              </option>
            ))}
          </select>
          {!selectedMarca && (
            <p className="mt-1 text-xs text-gray-400">Primero seleccione una marca</p>
          )}
        </div>

        {/* Correo */}
        <div>
          <label htmlFor="correoPropietario" className="block text-sm text-gray-500 mb-2">
            Correo del Propietario <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="correoPropietario"
            name="correoPropietario"
            value={formData.correoPropietario}
            onChange={handleInputChange}
            placeholder="propietario@correo.com"
            required
            disabled={loading}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefonoPropietario" className="block text-sm text-gray-500 mb-2">
            Teléfono del Propietario <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telefonoPropietario"
            name="telefonoPropietario"
            value={formData.telefonoPropietario}
            onChange={handleInputChange}
            placeholder="+506 8888-8888"
            required
            disabled={loading}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando vehículo...
            </span>
          ) : (
            'Registrar vehículo'
          )}
        </button>
      </div>
    </form>
  );
};
