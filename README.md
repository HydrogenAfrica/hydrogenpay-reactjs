<p align="center">
<img width="400" valign="top" src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" data-canonical-src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" style="max-width:100%; ">
</p>

# Hydrogen ReactJS SDK

Hydrogen ReactJS SDK allows you to accept payment using in your react application

## Installation

Register for a merchant account on [Hydrogen Merchant Dashboard](https://dashboard.hydrogenpay.com) to get started.

```bash
npm install --save hydrogenpay-reactjs
```

```bash
yarn add hydrogenpay-reactjs
```

```bash
pnpm add hydrogenpay-reactjs
```

## Support

If you have any problems, questions or suggestions, create an issue here or send your inquiry to support@hydrogenpay.com

## Implementation

You should already have your token, If not, go to [https://dashboard.hydrogenpay.com](https://dashboard.hydrogenpay.com).

### Usage 1 - As a React Hook

```jsx
import { useHydrogenPayment } from "hydrogenpay-reactjs";

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
    endDate: "2025-10-02", // OPTIONAL but (REQUIRED when isRecurring: true)
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
    <div className="...">
      <PayButton />
    </div>
  );
}

export default App;
```

### Usage 2 - As a Button Component

```jsx
import { HydrogenPaymentButton } from "hydrogenpay-reactjs";

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
    endDate: "2025-10-02", // OPTIONAL but (REQUIRED when isRecurring: true)
    mode: "TEST", //REQUIRED
  };

  const onClose = (close) => {
    console.log(close);
  };

  const onSuccess = (response, closeModal) => {
    console.log(response);
    setTimeout(() => closeModal(), 2000);
  };

  return (
    <div className="App">
      <HydrogenPaymentButton
        text="Payment"
        className="..."
        options={{ ...options, onSuccess, onClose }}
      />
    </div>
  );
}

export default App;
```

## Options Type

| Name         | Type       | Required | Desc                                                                        |
| ------------ | ---------- | -------- | --------------------------------------------------------------------------- |
| currency     | `String`   | Required | The currency for the transaction e.g NGN, USD                               |
| email        | `String`   | Required | The email of the user to be charged                                         |
| description  | `String`   | Optional | The transaction description                                                 |
| customerName | `String`   | Required | The fullname of the user to be charged                                      |
| amount       | `Number`   | Required | The transaction amount                                                      |
| token        | `String`   | Required | Your token or see above step to get yours                                   |
| onSuccess    | `Function` | Optional | Callback when transaction is successful                                     |
| onClose      | `Function` | Optional | Callback when transaction is closed of cancel                               |
| text         | `String`   | Optional | Payment Button Text. Default: Hydrogen Pay                                  |
| className    | `String`   | Optional | Payment Button style                                                        |
| children     | `Function` | Optional | React JSX Component                                                         |
| isRecurring  | `boolean`  | Optional | Recurring Payment                                                           |
| frequency    | `String`   | Optional | Recurring Payment frequency                                                 |
| mode         | `String`   | Required | Payment Mode e.g LIVE, TEST (default: TEST)                                 |
| endDate      | `String`   | Optional | Recurring Payment End Date. OPTIONAL but (REQUIRED when isRecurring = true) |
