"use client";
import { useState } from "react";
import { updateQuantity } from "../../actions/updateQuantity";
import Item from "./Item";
import Total from "./Total";
import "./styles.css";

export default function BeforeDemo() {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const updateQuantityAction = async (newQuantity: number) => {
    setIsPending(true);
    const savedQuantity = await updateQuantity(newQuantity);
    setQuantity(savedQuantity);
    setIsPending(false);
  };

  return (
    <div>
      <h1>Checkout (Before)</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}
