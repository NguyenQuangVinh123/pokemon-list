"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { limitItemPerPage } from "../utils/const";
type PaginationProps = {
  isHasNextPage: boolean;
  isHasPrevPage: boolean;
};
export default function Pagination(props: PaginationProps) {
  const { isHasNextPage, isHasPrevPage } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(0);
  useEffect(() => {
    router.push(
      `/pokemon-list?limit=1200&offset=${
        page * limitItemPerPage
      }&page=${page}&types=${searchParams.get("types") ?? ""}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={() => setPage(page - 1)}
        disabled={!isHasPrevPage}
        className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
      >
        Prev
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!isHasNextPage}
        className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
      >
        Next
      </button>
    </div>
  );
}
