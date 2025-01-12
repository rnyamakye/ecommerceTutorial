import Container from "./Container";
import Title from "./Title";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const ProductList = () => {
  return (
    <Container className="mb-10">
      <div className=" flex items-baseline md:items-center justify-between">
        <Title className="text-2xl" text="Top Selling Products" />
        <Link
          to={"/products"}
          className="font-medium relative group overflow-hidden"
        >
          {" "}
          View All Products{" "}
          <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
        </Link>
      </div>
      <div className="w-full h-[1px] bg-gray-200 my-5 md:my-3" />
      <div>
        <Pagination />
      </div>
    </Container>
  );
};

export default ProductList;
