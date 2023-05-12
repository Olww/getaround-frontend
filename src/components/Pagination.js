import React from 'react';

function Pagination({ page, setPage, perPage, cars }) {
    const totalPages = Math.ceil(cars.length / perPage);
    const isFirstPage = page === 1;
    const isLastPage = !cars || page === totalPages;

    const handlePrevPage = () => {
        setPage(Math.max(page - 1, 1));
    };

    const handleNextPage = () => {
        setPage(Math.min(page + 1, totalPages));
    };

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={handlePrevPage}
                disabled={isFirstPage}
            >
                Prev
            </button>
            <span className="pagination-info">{page}</span>
            <button
                className="pagination-button"
                onClick={handleNextPage}
                disabled={isLastPage}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
