import React, { useState } from "react";
import ReactPaginate from "react-paginate";

type PaginatedItemsProps = {
  itemsPerPage: number;
  eventsLength: any;
  onPageChange:any;
};

function PaginatedItems({ itemsPerPage, eventsLength, onPageChange }: PaginatedItemsProps) {
  const items = eventsLength;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(items / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newNum = event.selected + 1;
    const newOffset = newNum * itemsPerPage;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    onPageChange(newNum);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        className="pages"
      />
    </>
  );
}

export default PaginatedItems;
