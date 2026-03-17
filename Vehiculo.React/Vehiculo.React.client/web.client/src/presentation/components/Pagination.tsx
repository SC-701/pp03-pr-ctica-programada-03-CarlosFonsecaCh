// Pagination Component - Componente reutilizable de paginación

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems 
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Info de items */}
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-semibold">{startItem}</span> a{' '}
          <span className="font-semibold">{endItem}</span> de{' '}
          <span className="font-semibold">{totalItems}</span> vehículos
        </div>

        {/* Controles de paginación */}
        <div className="flex items-center gap-2">
          {/* Botón anterior */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Números de página */}
          <div className="flex gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`
                  px-3 py-2 rounded-lg font-medium transition-all duration-200
                  ${page === currentPage
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
                    : page === '...'
                    ? 'cursor-default text-gray-400'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                  ${page === '...' ? '' : 'min-w-[40px]'}
                `}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
