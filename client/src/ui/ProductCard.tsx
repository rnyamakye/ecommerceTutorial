import React, { useState } from "react";
import { ProductProps } from "../../type";
import { MdOutlineStarOutline } from "react-icons/md";
import AddToCartButton from "./AddToCartButton";
import FormattedPrice from "./FormattedPrice";
import ProductCardSideNav from "./ProductCardSideNav";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Button,
} from "@headlessui/react";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {
  item: ProductProps;
  searchText?: any;
}

const ProductCard = ({ item, setSearchText }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const percentage =
    ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice) * 100;

  const handleProduct = () => {
    navigate(`/product/${item?._id}`);
    setSearchText && setSearchText("");
  };

  return (
    <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2 group">
        <span
          onClick={open}
          className="bg-black text-skyText absolute left-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
        >
          save {percentage.toFixed(0)}%
        </span>
        <img
          onClick={handleProduct}
          src={item?.images[0]}
          alt="ProductImage"
          className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
        />
        <ProductCardSideNav product={item} />
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-xs uppercase font-semibold text-lightText">
          {item?.overView}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2">{item?.name}</h2>
        <div className="text-base text-lightText flex items-center">
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
        </div>
        <AddToCartButton className="" product={item}/>
      </div>
      <Transition show={isOpen} appear>
        <Dialog
          as={"div"}
          className={"relative z-10 focus:outline-none"}
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transition-[scale(95%)]"
                enterTo="opacity-100 transition-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel
                  className={
                    "w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6"
                  }
                >
                  <DialogTitle className={"text-base/7 font-medium text-white"}>
                    Hurry Up!
                  </DialogTitle>
                  <p>
                    You are going to save{" "}
                    <span>
                      <FormattedPrice
                        amount={item?.regularPrice - item?.discountedPrice}
                      />{" "}
                    </span>
                    From this product.{" "}
                  </p>
                  <p className="text-sm/6 text-white/50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, consequatur?
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductCard;
