import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaBitcoin, FaEthereum, FaUsdt, FaLira } from "react-icons/fa";

const CryptoPayment = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("BTC");
  const [paymentUrl, setPaymentUrl] = useState("");
  const router = useRouter();

  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/orders", { amount, currency, userId: 1 }); // Replace userId with actual user id from session
      setPaymentUrl(response.data.paymentUrl);
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  const handleCompletePayment = () => {
    if (paymentUrl) {
      router.push(paymentUrl); // Redirect user to the payment URL
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold">Crypto Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="input p-3 border border-gray-300 rounded-lg w-64"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="select p-3 border border-gray-300 rounded-lg w-64"
      >
        <option value="BTC">
          <FaBitcoin className="inline-block mr-2" /> BTC
        </option>
        <option value="USDT">
          <FaUsdt className="inline-block mr-2" /> USDT
        </option>
        <option value="LTC">
          <FaLira className="inline-block mr-2" /> LTC
        </option>
        <option value="TRX">
          <FaEthereum className="inline-block mr-2" /> TRX
        </option>
      </select>
      <button onClick={handlePayment} className="btn bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
        Pay with Crypto
      </button>

      {paymentUrl && (
        <button
          onClick={handleCompletePayment}
          className="btn bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Complete Payment
        </button>
      )}
    </div>
  );
};

export default CryptoPayment;
