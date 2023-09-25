"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingComponent from "../shared/LoadingComponent";

interface SearchProps {
  className?: string;
}

const BORDER_COLOR = {
  DEFAULT: "border-gray-300",
  FOCUS: "border-blue",
};
const Search: React.FC<SearchProps> = ({ className }) => {
  const [boderColor, setBorderFocus] = useState(BORDER_COLOR.DEFAULT);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleFocus = () => {
    setBorderFocus(BORDER_COLOR.FOCUS);
  };

  const handleBlur = () => {
    setBorderFocus(BORDER_COLOR.DEFAULT);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchParams.get("s") !== value) {
      setLoading(true);
      router.push(`/tim-kiem?s=${value}`);
    }
  };
  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);
  return (
    <form onSubmit={handleSubmit} className={className}>
      <div
        className={`flex   items-center relative border border-1 max-w-[235px]    ${boderColor} rounded-3xl`}
      >
        <div className="w-2/12">
          <MagnifyingGlassIcon
            className=" h-4 w-4 ml-2"
            aria-hidden="true"
            color="gray"
          />
        </div>

        <div className=" flex w-11/12 items-center">
          <div className="w-10/12">
            <input
              type="text"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              onChange={handleChange}
              className="py-2  focus:outline-none rounded-3xl w-full text-sm bg-body"
              placeholder="Từ khóa tìm kiếm..."
            />
          </div>

          <div className="w-2/12 pr-2">
            {loading && <LoadingComponent loading />}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
