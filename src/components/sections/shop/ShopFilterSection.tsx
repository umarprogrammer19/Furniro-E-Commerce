"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useFilter } from "@/context/filterContext";

function ShopFilterSection() {
  const { setMinPrice, setMaxPrice, setSortBy, setCategory } = useFilter();

  return (
    <section className="bg-[#F9F1E7] px-4 py-[31px] flex flex-col md:flex-row gap-8 justify-around items-center">
      {/* LHS */}
      <div className="flex gap-8 items-center">
        <div className="flex gap-2 items-center hover:cursor-pointer">
          <img
            src="/images/filter_icon.png"
            alt="filter icon"
            className="block"
          />
          <p>Filter</p>
        </div>

        <div className="hover:cursor-pointer">
          <img src="/images/grid_icon.png" alt="grid icon" className="block" />
        </div>
        <div className="hover:cursor-pointer">
          <img src="/images/list_icon.png" alt="list icon" className="block" />
        </div>
        <div className="hidden md:block">
          <Separator
            orientation="vertical"
            className="h-[37px] border border-customGray2"
          />
        </div>
        <p className="text-normal">Showing 1 - 8 of 24 results</p>
      </div>
      {/* RHS */}
      <div className="flex gap-8">
        <div className="flex gap-[17px] items-center">
          <p className="text-[20px]">Category</p>
          <Select
            onValueChange={(value) => {
              setCategory(value);
            }}
          >
            <SelectTrigger className="w-[180px] h-[55px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sofa">Sofas</SelectItem>
                <SelectItem value="table">Tables</SelectItem>
                <SelectItem value="chair">Chairs</SelectItem>
                <SelectItem value="bed">Beds</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="items">Items</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-[17px] items-center">
          <p className="text-[20px]">Price</p>
          <Input
            type="number"
            placeholder="Min"
            className="bg-white w-[130px] h-[40px]"
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Max"
            className="bg-white w-[130px] h-[40px]"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-[17px] items-center">
          <p className="text-[20px]">Sort by</p>
          <Select
            onValueChange={(value) => {
              setSortBy(value);
            }}
          >
            <SelectTrigger className="w-[180px] h-[55px]">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}

export default ShopFilterSection;
