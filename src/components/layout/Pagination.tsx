import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
    

    const pages: number[] = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-1.5 rounded border border-gray-200 hover:bg-gray-300 
              ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <GrFormPrevious />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={currentPage === page}
                    className={`px-2 py-[3px] rounded border border-gray-200 hover:bg-gray-300 ${currentPage === page ? 'bg-gray-300' : ''}`}>
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className={`px-2 py-1.5 rounded border border-gray-200 hover:bg-gray-300 
              ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : ''}`}><GrFormNext /></button>
        </div>
    )
}
export default Pagination
