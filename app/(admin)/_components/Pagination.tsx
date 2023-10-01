import Link from "next/link";
import React from "react";

interface PaginationProps {
  currentPage: number;
  limit: number;
  totalCount: number;
  keyword: string | undefined;
  href: string;
}

const Pagination = ({
  currentPage,
  limit,
  totalCount,
  keyword,
  href,
}: PaginationProps) => {
  const pageNumbers = [];
  const totalPages = Math.round(totalCount/limit)
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1) continue;
    if (i >  totalPages) break;
    pageNumbers.push(i);
  }


  return (
    <div className="py-4 flex justify-between">
      <div>
        Showing 1 to {limit > totalCount ? totalCount : limit} of {totalCount}{" "}
        entries
      </div>
      {totalPages > 1 && totalCount > limit && (
        <div className="flex space-x-1">
          {currentPage > 3 && (
            <Link
              href={{
                pathname: `/${href}/list`,
                query: { page: 1,limit:limit,keyword:keyword ? `${keyword}` : "" },
              }}
              className="px-4 py-2 rounded-[0.25rem] hover:bg-[#e0e0fc]"
            >
              ‹‹
            </Link>
          )}
          {currentPage !== 1 && (
            <Link
              href={{
                pathname: `/${href}/list`,
                query: { page: currentPage - 1,limit:limit,keyword:keyword ? `${keyword}` : "" },
              }}
              className="px-4 py-2 rounded-[0.25rem] hover:bg-[#e0e0fc]"
            >
              ‹
            </Link>
          )}
          {pageNumbers.map((page) => (
            <Link
              key={page}
              href={{
                pathname: `/${href}/list`,
                query: { page: page,limit:limit,keyword:keyword ? `${keyword}` : "" },
              }}
              className={`px-4 py-2 rounded-[0.25rem] ${
                page === currentPage ? "bg-[#E5E7EB]" : "hover:bg-[#e0e0fc]"
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage !== totalPages && (
            <Link
              href={{
                pathname: `/${href}/list`,
                query: { page: currentPage + 1,limit:limit,keyword:keyword ? `${keyword}` : "" },
              }}
              className="px-4 py-2 rounded-[0.25rem] hover:bg-[#e0e0fc]"
            >
              ›
            </Link>
          )}
          {currentPage < totalPages - 2 && (
            <Link
           
              href={{
                pathname: `/${href}/list`,
                query: { page: totalPages,limit:limit,keyword:keyword ? `${keyword}` : "" },
              }}
              className="px-4 py-2 rounded-[0.25rem] hover:bg-[#e0e0fc]"
            >
              ››
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
