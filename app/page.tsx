"use client";

import { useState } from "react";
import { FaCreditCard, FaQuestionCircle, FaInfoCircle } from "react-icons/fa"; // Import icons from react-icons

// Function to generate random integer in a given range
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a credit card number with a given BIN
const generateCreditCardNumber = (bin: string): string => {
  let cardNumber = bin;
  while (cardNumber.length < 15) {
    cardNumber += getRandomInt(0, 9);
  }

  // Luhn algorithm to generate valid card number
  const luhnChecksum = (number: string): number => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return (10 - (sum % 10)) % 10;
  };

  // Append the Luhn checksum digit
  cardNumber += luhnChecksum(cardNumber);
  return cardNumber;
};

// Function to generate a random CVV (3 digits)
const generateCvv = (): number => getRandomInt(100, 999);

// Function to generate a random expiry date (MM/YY)
const generateExpiryDate = (useRandom: boolean, expiryInput: string): string => {
  if (useRandom) {
    const month = getRandomInt(1, 12).toString().padStart(2, "0");
    const year = (getRandomInt(2024, 2030) % 100).toString().padStart(2, "0");
    return `${month}/${year}`;
  } else {
    const [month, year] = expiryInput.split("/");
    return `${month.padStart(2, "0")}/${year.padStart(2, "0")}`;
  }
};

// Function to format the card data into different formats (PIEP, JSON, CSV)
const formatCardData = (data: { cardNumber: string; cvv: number; expiry: string; bin: string }, format: string): string => {
  if (format === "piep") {
    return `${data.cardNumber}|${data.expiry.split("/")[0]}|${data.expiry.split("/")[1]}|${data.cvv}`;
  } else if (format === "json") {
    return JSON.stringify(data, null, 2);
  } else if (format === "csv") {
    return `cardNumber,cvv,expiry\n${data.cardNumber},${data.cvv},${data.expiry}`;
  }
  return "";
};

const Home = () => {
  const [cardDetails, setCardDetails] = useState<string[]>([]);
  const [binInput, setBinInput] = useState<string>("");
  const [expiryInput, setExpiryInput] = useState<string>(""); // Used if not random expiry
  const [outputFormat, setOutputFormat] = useState<string>("json");
  const [cardsToGenerate, setCardsToGenerate] = useState<number>(1);
  const [useRandomExpiry, setUseRandomExpiry] = useState<boolean>(true);

  // Handle card generation logic
  const handleGenerate = () => {
    if (!binInput) {
      alert("Please enter a BIN number!");
      return;
    }

    const generatedCards: string[] = [];
    for (let i = 0; i < cardsToGenerate; i++) {
      const cardNumber = generateCreditCardNumber(binInput);
      const cvv = generateCvv();
      const expiry = generateExpiryDate(useRandomExpiry, expiryInput);
      const cardData = {
        cardNumber,
        cvv,
        expiry,
        bin: binInput,
      };

      const formattedCard = formatCardData(cardData, outputFormat);
      generatedCards.push(formattedCard);
    }

    setCardDetails(generatedCards);
  };

  // Handle export functionality
  const handleExport = () => {
    if (cardDetails.length > 0) {
      const formattedData = cardDetails.join("\n");
      const blob = new Blob([formattedData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `credit_card_details.${outputFormat}`;
      link.click();
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-blue-500 to-teal-500 animate-background min-h-screen flex flex-col items-center text-white py-10">
      <h1 className="text-4xl font-bold mb-8">Random Credit Card Generator</h1>

      {/* About Section */}
      <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl flex items-center gap-2"><FaInfoCircle /> About</h2>
        <p className="mt-4">
          This tool generates random credit card details for testing purposes only. It includes the card number, CVV, and expiry date.
          <br />
          Please note, the generated data is not real and cannot be used for actual transactions.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl flex items-center gap-2"><FaCreditCard /> Features</h2>
        <ul className="list-inside list-disc mt-4">
          <li><FaCreditCard /> Generate valid-looking credit card numbers with a user-defined BIN.</li>
          <li><FaCreditCard /> Random or custom expiry date generation.</li>
          <li><FaCreditCard /> Export generated cards in PIEP, CSV, or JSON formats.</li>
          <li><FaCreditCard /> Download all generated cards in your selected format.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl flex items-center gap-2"><FaQuestionCircle /> FAQ</h2>
        <div className="mt-4">
          <strong>Q: What is a BIN?</strong>
          <p>A BIN (Bank Identification Number) is the first 6 digits of a credit card number that identifies the card issuer.</p>
        </div>
        <div className="mt-4">
          <strong>Q: Is this tool for real credit cards?</strong>
          <p>No, this tool is for generating random credit card numbers for testing purposes only.</p>
        </div>
        <div className="mt-4">
          <strong>Q: Can I use these generated numbers for transactions?</strong>
          <p>No, these numbers are fake and cannot be used for real-world transactions.</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Enter BIN (6 digits)"
          value={binInput}
          onChange={(e) => setBinInput(e.target.value)}
          maxLength={6}
          className="p-3 mb-4 w-full text-black rounded-lg border border-gray-300"
        />
        <input
          type="number"
          value={cardsToGenerate}
          onChange={(e) => setCardsToGenerate(Number(e.target.value))}
          placeholder="How many cards?"
          min={1}
          className="p-3 mb-4 w-full text-black rounded-lg border border-gray-300"
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY, leave blank for random)"
          value={expiryInput}
          onChange={(e) => setExpiryInput(e.target.value)}
          className="p-3 mb-4 w-full text-black rounded-lg border border-gray-300"
        />
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={useRandomExpiry}
            onChange={() => setUseRandomExpiry(!useRandomExpiry)}
            className="h-5 w-5"
          />
          <label>Use random expiry date</label>
        </div>

        <div className="flex justify-between mb-4">
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="p-3 text-black rounded-lg border border-gray-300 w-1/2"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="piep">PIEP</option>
          </select>

          <button
            onClick={handleGenerate}
            className="p-3 bg-blue-600 text-white rounded-lg w-1/3 hover:bg-blue-700 transition"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Display Generated Cards */}
      {cardDetails.length > 0 && (
        <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-8">
          <textarea
            rows={10}
            cols={50}
            readOnly
            value={cardDetails.join("\n")}
            className="w-full text-black p-3 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      <div className="mb-8">
        <button
          onClick={handleExport}
          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Export to {outputFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default Home;
