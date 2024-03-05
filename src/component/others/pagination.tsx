
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  // Toujours inclure la première page
  if (currentPage > 4) {
    pageNumbers.push(1);
    if (currentPage > 5) pageNumbers.push('...');
  }

  // Calcul des pages précédentes
  for (let i = Math.max(1, currentPage - 3); i < currentPage; i++) {
    pageNumbers.push(i);
  }

  // Page courante
  pageNumbers.push(currentPage);

  // Calcul des pages suivantes
  for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 3); i++) {
    pageNumbers.push(i);
  }

  // Toujours inclure la dernière page
  if (currentPage < totalPages - 3) {
    if (currentPage < totalPages - 4) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <div className="w-8/10 h-2/10 flex justify-evenly self-center flex-row items-center gap-2">
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={`border-1 border-black rounded-full w-8 h-8 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
