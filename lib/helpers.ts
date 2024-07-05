export interface HydrogenPaymentTypes {
  amount: Number;
  customerName: string;
  email: string;
  currency?: string;
  description?: string;
  redirectUrl?: string;
  meta?: string;
  token: string;
  isRecurring?: boolean;
  frequency?: number;
  endDate?: string;
  onClose?: (event: Event) => void;
  onSuccess?: (event: Event) => void;
  mode: "LIVE" | "TEST";
}

export async function openHydrogenPayModal(options: HydrogenPaymentTypes) {
  // @ts-ignore
  if (window.handlePgData) {
    // @ts-ignore
    const getRef = window.handlePgData(
      {
        amount: options.amount,
        email: options.email,
        currency: options.currency,
        description: options.description,
        meta: options.meta,
        isAPI: false,
        isRecurring: options.isRecurring,
        frequency: options.frequency,
        CustomerName: options.customerName,
      },
      options.token,
      (e: any) => {
        options.onClose && options.onClose(e);
        clearInterval(checkStatus);
      }
    );


    //get payment reference
    const transactionRef = await getRef;


    //pooling transaction status
    let checkStatus =
      transactionRef &&
      setInterval(async function () {
        //@ts-ignore
        const checkPaymentStatus = await window.handlePaymentStatus(
          transactionRef,
          options.token
        );
        if (checkPaymentStatus?.status === "Paid") {
          //@ts-ignore
          options.onSuccess &&
            //@ts-ignore
            options.onSuccess(checkPaymentStatus, window?.closeModal);
          clearInterval(checkStatus);
        }
      }, 2000);
  }
}
