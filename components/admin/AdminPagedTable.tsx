"use client";

import { ReactNode, useMemo, useState } from "react";

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type AdminPagedTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  pageSize?: number;
};

export default function AdminPagedTable<T>({
  rows,
  columns,
  rowKey,
  emptyMessage = "No records found.",
  pageSize = 8,
}: AdminPagedTableProps<T>) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, currentPage, pageSize]);

  return (
    <div className="admin-data">
      <div className="admin-data__table-wrap">
        <table className="admin-table admin-table--paged">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.className}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <tr key={rowKey(row)}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={column.className}
                      data-label={column.header}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="admin-table__empty">
                <td colSpan={columns.length}>{emptyMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <p>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          <span className="admin-pagination__count"> · {rows.length} total</span>
        </p>
        <div className="admin-pagination__actions">
          <button
            type="button"
            className="btn btn--outline btn--sm"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
