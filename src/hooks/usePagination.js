import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (element, index) => index + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {

    const FIRST_LAST_CURRENT_2DOTS = 5;
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const FIRST_PAGE = 1;
    const POSITION_FROM_DOTS = 2;
    const TWO_BUTTONS = 2;
    const THREE_BUTTONS = 3;


    const totalPageNumbers = siblingCount + FIRST_LAST_CURRENT_2DOTS;

    if (totalPageNumbers >= totalPageCount) {
      return range(FIRST_PAGE, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > POSITION_FROM_DOTS;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - POSITION_FROM_DOTS;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = THREE_BUTTONS + TWO_BUTTONS * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = THREE_BUTTONS + TWO_BUTTONS * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};