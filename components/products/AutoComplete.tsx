import React, { useState, useEffect, useRef } from "react";
import { Paper } from "@mui/material";
import { Search01Icon } from "hugeicons-react";
import Link from 'next/link';
import { fetchDefaultSearch } from "@/services/product.service";
import useRouting from "@/hooks/routing";

interface AutocompleteProps {
  handleSelected: (selectedItem: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ handleSelected }) => {
  const { setParam } = useRouting();
  const resultsLoaderRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<{ description: string; ingramPartNumber: string }[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
  const [delayedSearch, setDelayedSearch] = useState<NodeJS.Timeout | null>(null);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isResultsLoaderVisible, setIsResultsLoaderVisible] = useState<boolean>(false);

  const goToProduct = (path: string) => {
    setParam(path, "/products", "search");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsLoaderRef.current && !resultsLoaderRef.current.contains(event.target as Node)) {
        setIsResultsLoaderVisible(false); // Hide results loader
        setSearchTerm("");
        setSuggestions([]);
        setIsItemSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (delayedSearch) {
        clearTimeout(delayedSearch);
      }
    };
  }, [delayedSearch]);

  const handleSelect = (selectedItem: { description: string; ingramPartNumber: string }) => {
    setSearchTerm(selectedItem.description);
    setIsItemSelected(true);
    handleSelected(selectedItem.description);
    goToProduct(selectedItem.ingramPartNumber);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToProduct(searchTerm);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setIsItemSelected(false); // Reset the state when the input changes

    if (delayedSearch) {
      clearTimeout(delayedSearch);
    }

    // Delay the API call for 500 milliseconds after the user stops typing
    setDelayedSearch(
      setTimeout(() => {
        if (newSearchTerm.trim() !== "") {
          setIsSearching(true);
          setIsResultsLoaderVisible(false); // Show results loader

          const payload = {
            keywords: newSearchTerm,
            pageSize: pageSize,
            pageNumber: pageNumber,
          };

          /*fetchDefaultSearch(JSON.stringify(payload))
            .then((data) => {
              const suggestionsData = data.data.map(
                (product: { description: string; ingramPartNumber: string }) => ({
                  description: product.description,
                  ingramPartNumber: product.ingramPartNumber
                })
              );
              setSuggestions(suggestionsData);
              const totalPages = Math.ceil(data.recordsFound / pageSize);
              setTotalPages(totalPages);

              if (pageNumber >= totalPages) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
              }
            })
            .catch((error) => {
              console.error("Error fetching suggestions:", error);
            })
            .finally(() => setIsSearching(false));*/
        } else {
          setIsResultsLoaderVisible(false); // Hide results loader if input is empty
        }
        
        // Redirect to product page with the current search term
        goToProduct(newSearchTerm);
      }, 500)
    );
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageNumber(1);
  };

  return (
    <Paper component="form" className="searchForm w-full">
      <div className="hidden md:flex flex-1 max-w-3xl relative mx-4">
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Keyword, Part Number or SKU" 
          className="w-full flex-1 rounded-xl text-gray-900 text-lg
           placeholder:text-base placeholder:tracking-wide shadow-sm 
           ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 placeholder:font-normal 
           focus:ring-1 focus:ring-grayText sm:text-sm px-4 py-2" 
        />
        
         <Search01Icon className="absolute top-2.5 right-4 text-xl cursor-pointer" size={18}  /> 
      </div>
        
      <div
        ref={resultsLoaderRef}
        className={`resutsLoader${isResultsLoaderVisible ? "" : " hidden"}${suggestions.length > 10 ? " scrollbar" : ""}`}
      >
        {isSearching ? (
          <div>Searching...</div>
        ) : searchTerm.trim() !== "" && !isItemSelected && suggestions.length > 0 ? (
          <ul className="suggestions">
            {suggestions.map((item, index) => (
              <li key={index} className="font-bold">
                <Link href={`/productdetail?id=${item.ingramPartNumber}`}>
                  {item.description}
                </Link>
              </li>
            ))}
          </ul>
        ) : !isSearching && searchTerm.trim() !== "" && suggestions.length === 0 ? (
          <div>No results found.</div>
        ) : null}
      </div>
    </Paper>
  );
};

export default Autocomplete;
