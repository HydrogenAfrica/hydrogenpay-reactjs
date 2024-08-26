export interface HydrogenPaymentTypes {
  amount: Number;
  customerName: string;
  email: string;
  currency?: string;
  description?: string;
  redirectUrl?: string;
  meta?: string;
  token?: string;
  isRecurring?: boolean;
  frequency?: number;
  endDate?: string;
  onClose?: (event: any) => void;
  onSuccess?: (event: any, closeModal: any) => void;
  mode?: "LIVE" | "TEST" | undefined;
  apiKey: string;
}

export async function openHydrogenPayModal(options: HydrogenPaymentTypes) {
  let checkStatus: any;
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
        ...(options.isRecurring && options.endDate
          ? { endDate: options.endDate }
          : {}),
      },
      options.apiKey,
      (e: any) => {
        options.onClose && options.onClose(e);
        clearInterval(checkStatus);
      }
    );

    //get payment reference
    const transactionRef = await getRef;

    //pooling transaction status

    if (transactionRef && transactionRef !== "Error in initiating payment") {
      checkStatus = setInterval(async function () {
        //@ts-ignore
        const checkPaymentStatus = await window.handlePaymentStatus(
          transactionRef,
          options.apiKey
        );

        if (checkPaymentStatus?.status === "Paid") {
          options.onSuccess &&
            options.onSuccess(checkPaymentStatus, () =>
              //@ts-ignore
              window?.closeModal({ transactionRef })
            );
          clearInterval(checkStatus);
        }
      }, 2000);
    } else {
      console.error(`ERROR: ${transactionRef}`);
    }
  }
}
