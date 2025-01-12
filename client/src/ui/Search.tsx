import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { getData } from "../lib";
import { config } from "../config";
import ProductCard from "./ProductCard";
import { ProductProps } from "../../type";


const Search = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef<HTMLDivElement | null>(null); // Specify ref type
  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click target is outside the searchRef
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsSearchVisible(false);
    }
  };
  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseURL}/products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseURL}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((item: ProductProps) =>
      item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="" ref={searchRef}>
        {!isSearchVisible && window.innerWidth <= 500 && (
          <button
            type="button"
            onClick={handleSearchToggle}
            className={`flex items-center ml-2 ${
              isSearchVisible ? "hidden" : "block"
            }`}
          >
            <IoSearchOutline />
          </button>
        )}
        {isSearchVisible && (
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search..."
              className={`translate-x-5 flex-1 pl-10 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus-ring-2 focus:ring-darkText sm:text-sm px-4 py-2 transition-all duration-300 ${
                isSearchVisible
                  ? "w-[10rem] transition-all ease-in-out duration-300 opacity-100 bg-gray-50"
                  : "w-0 opacity-0"
              }`}
            />
            {isSearchVisible ? (
              <IoClose
                onClick={() => setSearchText("")}
                className="absolute top-2.5 right-0 text-xl hover:text-red-500 cursor-pointer duration-200"
              />
            ) : (
              <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
            )}
          </div>
        )}
        {searchText && (
          <div className="absolute left-0 top-20 w-full mx-auto max-h-[500px] px-5 py-5 bg-white z-20 overflow-y-scroll cursor-pointer text-black shadow-lg shadow-skyText scrollbar-hide">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {filteredProducts?.map((item: ProductProps) => (
                  <ProductCard
                    key={item?._id}
                    item={item}
                    setSearchText={setSearchText}
                  />
                ))}
              </div>
            ) : (
              <div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md">
                <p className="text-xl font-normal ">
                  Nothing matches with your search keywords{" "}
                  <span className="underline underline-offset-2 decoration-[1px] text-red-500 font-semibold">{`(${searchText})`}</span>
                </p>
                . Please try again
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
