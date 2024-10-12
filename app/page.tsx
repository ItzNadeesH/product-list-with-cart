"use client";

import { productList } from "@/lib/data";
import { CartContextProvider } from "@/context/CartContext";

import ProductItem from "@/components/ProductItem";
import ItemCart from "@/components/ItemCart";
import { useCartContext } from "@/hooks/useCartContext";

export default function Home() {
  return (
    <>
      <CartContextProvider>
        <Store />
      </CartContextProvider>
    </>
  );
}

const Store = () => {
  const { dispatch } = useCartContext();

  return (
    <>
      <div className="p-6 bg-rose-50">
        <h2 className="mb-6 font-bold text-[32px]">Desserts</h2>
        {productList.map((item) => (
          <ProductItem key={item.id} product={item} dispatch={dispatch} />
        ))}
        <ItemCart />
      </div>
    </>
  );
};
