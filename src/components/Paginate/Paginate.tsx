import { DOTS, usePagination } from "~/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui";

type PaginateProps = {
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Paginate({
  page,
  rowsPerPage,
  total,
  onPageChange,
}: PaginateProps) {
  const {
    paginationRange,
    offset,
    canGoBack,
    canGoNext,
    isFirstPage,
    isLastPage,
  } = usePagination({
    page,
    totalItems: total,
    perPage: rowsPerPage,
  });

  const onNext = () => {
    if (canGoNext) {
      onPageChange(page + 1);
    }
  };

  const onPrevious = () => {
    if (canGoBack) {
      onPageChange(page - 1);
    }
  };

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        {/* Botão Anterior */}
        <PaginationItem>
          <button
            onClick={onPrevious}
            disabled={isFirstPage}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaginationPrevious />
          </button>
        </PaginationItem>

        {/* Números das Páginas */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <button onClick={() => onPageChange(Number(pageNumber))}>
                <PaginationLink isActive={page === pageNumber}>
                  {pageNumber}
                </PaginationLink>
              </button>
            </PaginationItem>
          );
        })}

        {/* Botão Próximo */}
        <PaginationItem>
          <button
            onClick={onNext}
            disabled={isLastPage}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaginationNext />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
