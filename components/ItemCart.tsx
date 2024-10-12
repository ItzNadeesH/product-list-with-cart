import { useCartContext } from "@/hooks/useCartContext";
import Image from "next/image";
import React from "react";
import { Product } from "./ProductItem";

type CartItem = {
  item: Product;
  quantity: number;
};

const ItemCart = () => {
  const { state: data, dispatch } = useCartContext();

  const handleRemove = (cartItem: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", payload: cartItem });
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <h2 className="text-[20px] font-bold text-red mb-8">
          Your Cart ({data.length})
        </h2>
        {data.length > 0 ? (
          <>
            {data.map((cartItem: CartItem) => (
              <div
                key={cartItem.item.id}
                className="flex justify-between items-center pb-5 mb-4 border-b border-rose-100"
              >
                <div>
                  <p className="font-semibold text-[14px] mb-3">
                    {cartItem.item.name}
                  </p>
                  <div className="flex items-center">
                    <p className="font-semibold text-[14px] text-red mr-4">
                      {cartItem.quantity}x
                    </p>
                    <p className="text-rose-500 text-[14px] mr-2">
                      @ ${cartItem.item.price.toFixed(2)}
                    </p>
                    <p className="font-semibold text-rose-500 text-[14px]">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(cartItem)}
                  className="mb-2 border border-rose-300 p-[2px] rounded-full"
                >
                  <Image
                    src={require("../public/assets/images/icon-remove-item.svg")}
                    alt="icon-remove-item"
                  />
                </button>
              </div>
            ))}
            <div className="my-6 flex justify-between items-center">
              <p className="text-[14px] text-rose-900">Order Total</p>
              <p className="text-[24px] font-bold">$46.50</p>
            </div>
            <div className="flex items-center p-4 mb-6 bg-rose-50 rounded-lg">
              <Image
                src={require("../public/assets/images/icon-carbon-neutral.svg")}
                alt="tree-icon"
              />
              <p className="text-[14px] mx-2">
                This is a <span className="font-semibold">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>
            <button className="w-full py-5 bg-red rounded-full text-white font-semibold">
              Confirm Order
            </button>
          </>
        ) : (
          <div>
            <Image
              src={require("../public/assets/images/illustration-empty-cart.svg")}
              alt="cake"
              className="mx-auto mt-8 mb-4"
            />
            <p className="mb-4 text-[14px] text-rose-500 font-semibold text-center">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemCart;
