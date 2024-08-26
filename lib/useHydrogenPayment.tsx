import { useEffect } from "react";
import usePaymentScript from "./usePaymentScript";
import { openHydrogenPayModal, HydrogenPaymentTypes } from "./helpers";

export default function useHydrogenPayment(
  payload: HydrogenPaymentTypes
): () => void {
  //load script
  const [scriptError, loaded] = usePaymentScript(payload?.apiKey);

  function paymentInit(): void {
    if (scriptError) {
      throw new Error("Unable to load payment script");
    }
    if (loaded) {
      openHydrogenPayModal(payload);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error("Unable to load payment script");
    }
  }, [scriptError]);

  return paymentInit;
}
