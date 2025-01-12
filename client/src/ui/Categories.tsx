import { useState, useEffect } from "react";
import Container from "./Container";
import { config } from "../config";
import { getData } from "../lib";
import Title from "./Title";
import { Link } from "react-router-dom";
import { CategoryProps } from "../../type";

const Categories = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <Container>
      <div className="mb-10">
        <div className="flex md:items-center items-baseline justify-between">
          <Title text="Popular Categories " />
          <Link
            to={"/category/tvAndAudio"}
            className="font-medium relative mr-2 md:mr-0 group overflow-hidden"
          >
            {" "}
            View All{" "}
            <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-5 md:my-3" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
          {categories.map((item: CategoryProps) => (
            <Link
              key={item?._id}
              to={`category/${item?._base}`}
              className="w-full h-auto relative group overflow-hidden"
            >
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-auto rounded-md group-hover:scale-110 duration-300"
              />
              <div className="absolute bottom-3 w-full text-center">
                <p className="text-sm md:text-base font-semibold">
                  {item?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
