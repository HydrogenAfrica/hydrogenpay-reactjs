import React from "react";
import { useHydrogenPayment, HydrogenPaymentButton } from "hydrogenpay-reactjs";

function App() {
  const options = {
    amount: 500, // REQUIRED
    email: "test@mail.com", // REQUIRED
    customerName: "John Doe", // REQUIRED
    meta: "ewr34we4w", // OPTIONAL
    apiKey: "PK_TEST_cca53e0b3bc7847aff94502b8a585f84", // REQUIRED
    description: "Test description", // OPTIONAL
    currency: "NGN", // REQUIRED
    frequency: 1, // OPTIONAL
    isRecurring: false, // OPTIONAL
    endDate: "2025-10-02",// OPTIONAL but (REQUIRED when isRecurring: true)
  };

  const onClose = (close) => {
    console.log(close);
  };
  const onSuccess = (response, closeModal) => {
    console.log(response);
    setTimeout(() => closeModal(), 2000);
  };

  const PayButton = () => {
    const initializePayment = useHydrogenPayment({
      ...options,
      onSuccess,
      onClose,
    });

    return <button onClick={() => initializePayment()}>Pay</button>;
  };

  return (
    <div className="App">
      <PayButton />
      {/* <HydrogenPaymentButton
        text="Payment"
        className="text-primary"
        options={{ ...options, onSuccess, onClose }}
      /> */}
    </div>
  );
}

export default App;
