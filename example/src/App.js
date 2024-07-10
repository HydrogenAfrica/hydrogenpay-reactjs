import React from "react";
import { useHydrogenPayment, HydrogenPaymentButton } from "hydrogenpay-reactjs";

function App() {
  const options = {
    amount: 500, // REQUIRED
    email: "test@mail.com", // REQUIRED
    customerName: "John Doe", // REQUIRED
    meta: "ewr34we4w", // OPTIONAL
    token: "E2E411B102072296C73F76339497FB8529FF552F0D6817E0F3B46A243961CA21", // REQUIRED
    description: "Test description", // OPTIONAL
    currency: "NGN", // REQUIRED
    frequency: 1, // OPTIONAL
    isRecurring: false, // OPTIONAL
    endDate: "2025-10-02",// OPTIONAL but (REQUIRED when isRecurring: true)
    mode: "TEST", //REQUIRED
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
