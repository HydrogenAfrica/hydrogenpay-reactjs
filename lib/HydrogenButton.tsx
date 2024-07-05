import React, { ReactNode } from "react";
import useHydrogenPayment from "./useHydrogenPayment";
import { HydrogenPaymentTypes } from "helpers";

interface ButtonTypes {
  text?: string;
  className?: string;
  children?: ReactNode;
  options: HydrogenPaymentTypes;
}

const HydrogenPayButton = (payload: ButtonTypes): JSX.Element => {
  const initializePayment = useHydrogenPayment(payload.options);
  return (
    <button onClick={initializePayment} className={payload.className}>
      {payload.text || payload.children}
    </button>
  );
};

export default HydrogenPayButton;
