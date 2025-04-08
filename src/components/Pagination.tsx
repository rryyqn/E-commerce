"use client";
import React from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mt-12 flex justify-between w-full">
      <Button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-none disabled:opacity-0"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-none disabled:opacity-0"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
