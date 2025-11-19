import { useMemo } from "react";

export type UsePaginationProps = {
  totalItems: number;
  perPage?: number;
  siblings?: number;
  page: number;
};

export const DOTS = "...";

export const usePagination = ({
  totalItems,
  perPage = 10,
  siblings = 1,
  page,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblings * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(page - siblings, 1);
    const rightSiblingIndex = Math.min(page + siblings, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from(
        { length: siblings * 2 + 3 },
        (_, i) => i + 1
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: siblings * 2 + 3 },
        (_, i) => totalPages - (siblings * 2 + 2) + i
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: siblings * 2 + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalItems, perPage, page, siblings]);

  const offset = (page - 1) * perPage;

  const canGoBack = page > 1;
  const canGoNext = page < totalPages;

  const isFirstPage = page === 1;

  return {
    page,
    perPage,
    offset,
    totalPages,
    paginationRange,
    canGoBack,
    canGoNext,
    isFirstPage,
    isLastPage: page === totalPages,
  };
};
