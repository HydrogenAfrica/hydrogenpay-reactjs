import React from "react";
import { HydrogenPaymentButton } from "hydrogenpay-reactjs";

function App() {
  const options = {
    amount: 500, // REQUIRED
    email: "test@mail.com", // REQUIRED
    customerName: "John Doe", // REQUIRED
    meta: "ewr34we4w", // OPTIONAL
    token: "02B44E61C25BDB6C52E50D0B6A4E1016F993CE6B625BF7812A018CE43C886872", // REQUIRED
    description: "Test description", // OPTIONAL
    currency: "NGN", // REQUIRED
    frequency: 1, // OPTIONAL
    isRecurring: false, // OPTIONAL
    autoStart: false, // OPTIONAL
    mode: "TEST", //REQUIRED
  };

  const onClose = (close) => {
    console.log(close);
  };
  const onSuccess = (response, closeCheckout) => {
    console.log(response);
    setTimeout(() => closeCheckout(), 2000);
  };

  return (
    <div className="App">
      <HydrogenPaymentButton
        text="Payment"
        className="text-primary"
        options={{ ...options, onSuccess, onClose }}
      />
    </div>
  );
}

export default App;
