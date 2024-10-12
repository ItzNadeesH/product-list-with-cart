import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useCartContext } from "@/hooks/useCartContext";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: any;
};

interface Props {
  product: Product;
  dispatch: ({}) => void;
}

const ProductItem = ({ product, dispatch }: Props) => {
  const { state } = useCartContext();
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { item: product, quantity: 1 },
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      dispatch({
        type: "UPDATE_ITEM",
        payload: { item: product, quantity: quantity - 1 },
      });
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      dispatch({
        type: "UPDATE_ITEM",
        payload: { item: product, quantity: prevQuantity + 1 },
      });
      return prevQuantity + 1;
    });
  };

  useEffect(() => {
    if (
      state.some((cartItem: any) =>
        cartItem.item.id === product.id ? true : false
      )
    ) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [state]);

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Image
            src={product.image.mobile}
            alt={product.name}
            className={`w-full h-[210px] object-cover rounded-lg ${
              selected ? "border-2 border-red" : "border-2 border-transparent"
            }`}
            priority
          />

          {selected ? (
            <div className="absolute -bottom-5 left-1/2 -translate-x-2/4 flex justify-center items-center h-10 w-[160px] border border-red bg-red rounded-full select-none">
              <div className="flex items-center justify-between grow px-3">
                <div
                  onClick={handleDecrement}
                  className="inline-flex border-2 border-rose-100 w-[18px] h-[18px] rounded-full cursor-pointer"
                >
                  <Image
                    src={require("../public/assets/images/icon-decrement-quantity.svg")}
                    alt="decrement-icon"
                    className="mx-auto"
                  />
                </div>

                <p className="text-[14px] font-medium text-white cursor-default">
                  {quantity}
                </p>

                <div
                  onClick={handleIncrement}
                  className="inline-flex border-2 border-rose-100 w-[18px] h-[18px] rounded-full cursor-pointer"
                >
                  <Image
                    src={require("../public/assets/images/icon-increment-quantity.svg")}
                    alt="cart-icon"
                    className="mx-auto w-[10px]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="absolute -bottom-5 left-1/2 -translate-x-2/4 flex justify-center items-center h-10 w-[160px] border border-rose-300 bg-white rounded-full"
            >
              <div className="flex items-center">
                <Image
                  src={require("../public/assets/images/icon-add-to-cart.svg")}
                  alt="cart-icon"
                />
                <p className="pl-2 text-[14px] font-semibold">Add to Cart</p>
              </div>
            </button>
          )}
        </div>

        <div className="mt-10">
          <p className="text-[14px] mb-3 text-rose-400">{product.category}</p>
          <p className="font-semibold mb-3 text-rose-900">{product.name}</p>
          <p className="font-semibold text-red">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};

export default memo(ProductItem);
