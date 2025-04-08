"use client";
import React from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectChange = (value: string, name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex items-center gap-2 md:gap-6 flex-wrap">
        <div className="border shadow-sm border-gray-200 rounded-md flex items-center gap-1 justify-center flex-row px-4 box-border h-[36px]">
          <Label className="font-normal text-gray-500">Price ($)</Label>
          <Input
            type="number"
            placeholder="Min"
            name="min"
            className="w-12 text-sm border-none shadow-none text-center px-2 placeholder:text-gray-400"
            onChange={handleFilterChange}
          />
          -
          <Input
            type="number"
            placeholder="Max"
            name="max"
            className="w-12 text-sm border-none shadow-none text-center px-2 placeholder:text-gray-400"
            onChange={handleFilterChange}
          />
        </div>
        <Select onValueChange={(value) => handleSelectChange(value, "type")}>
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physical">Physical</SelectItem>
            <SelectItem value="digital">Digital</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSelectChange(value, "cat")}>
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <Select
          name="sort"
          onValueChange={(value) => handleSelectChange(value, "sort")}
        >
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc-price">Price (low to high)</SelectItem>
            <SelectItem value="desc-price">Price (high to low)</SelectItem>
            <SelectItem value="asc-lastUpdated">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
