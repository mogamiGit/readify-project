import React from 'react'

interface Props {
      page: number;
      totalPages: number;
      onPageChange: (newPage: number) => void
}

const ControlPageButtons: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
      const buttonClass = 'px-6 py-4 border rounded-full bg-gray-300 border border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300/50 disabled:hover:bg-gray-300 disabled:border-0'

      return (
            <div className="flex items-center justify-center gap-6 pb-12">
                  <button
                        className={buttonClass}
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                  >
                        ⬅ Anterior
                  </button>
                  <p><span className='font-bold'>Página {page}</span> de {totalPages}</p>
                  <button
                        className={buttonClass}
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                  >
                        Siguiente ➡
                  </button>
            </div>
      );
}

export default ControlPageButtons;