"use client";

import { useState } from "react";
import { FaCreditCard, FaQuestionCircle, FaInfoCircle, FaClipboard } from "react-icons/fa"; // Import icons from react-icons

// Function to generate random integer in a given range
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a credit card number using the Luhn algorithm
const generateCardNumber = (bin: string): string => {
  let cardNumber = bin;
  
  // Generate the rest of the number
  while (cardNumber.length < 15) {
    cardNumber += getRandomInt(0, 9);
  }

  // Luhn algorithm to generate a valid card number
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

// Define BIN ranges for different card types
const cardTypes = {
  visa: "4",
  mastercard: "5",
  amex: "34", // AMEX cards typically start with 34 or 37
  discover: "6", // Discover cards start with 6011, 622126-622925, etc.
};

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
  const [binInput, setBinInput] = useState<string>(""); // Used for input BIN number
  const [expiryInput, setExpiryInput] = useState<string>(""); // Used if not random expiry
  const [cardsToGenerate, setCardsToGenerate] = useState<number>(1);
  const [useRandomExpiry, setUseRandomExpiry] = useState<boolean>(true);
  const [cardType, setCardType] = useState<string>("visa");

  // Handle card generation logic
  const handleGenerate = () => {
    const generatedCards: string[] = [];
    const binPrefix = binInput || cardTypes[cardType]; // Use BIN input or default to selected card type

    if (!binPrefix) {
      alert("Please enter a valid BIN prefix!");
      return;
    }

    for (let i = 0; i < cardsToGenerate; i++) {
      // Generate a valid card number based on the selected BIN prefix
      const cardNumber = generateCardNumber(binPrefix);
      const cvv = generateCvv();
      const expiry = generateExpiryDate(useRandomExpiry, expiryInput);
      const cardData = {
        cardNumber,
        cvv,
        expiry,
        bin: binPrefix,
      };

      const formattedCard = formatCardData(cardData, "json"); // Directly using "json" or the desired format
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
      link.download = `credit_card_details.json`; // Default to JSON export
      link.click();
    }
  };

  // Copy all cards to clipboard
  const handleCopyAll = () => {
    if (cardDetails.length > 0) {
      navigator.clipboard.writeText(cardDetails.join("\n"));
      alert("Card details copied to clipboard!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-blue-500 to-teal-500 animate-background min-h-screen flex flex-col items-center text-white py-10">
      <h1 className="text-4xl font-bold mb-8">Random Credit Card Generator</h1>

      {/* Card Generation UI */}
      <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Generate Credit Cards</h2>
        <div className="flex gap-2 mb-4">
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="p-3 text-black rounded-lg border border-gray-300 w-1/2"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="amex">AMEX</option>
            <option value="discover">Discover</option>
          </select>

          <input
            type="text"
            placeholder="Enter BIN prefix"
            value={binInput}
            onChange={(e) => setBinInput(e.target.value)}
            className="p-3 text-black rounded-lg border border-gray-300 w-1/2"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={cardsToGenerate}
            onChange={(e) => setCardsToGenerate(Number(e.target.value))}
            className="p-3 text-black rounded-lg border border-gray-300 w-1/2"
            min={1}
          />
          <input
            type="text"
            value={expiryInput}
            onChange={(e) => setExpiryInput(e.target.value)}
            placeholder="Expiry MM/YY"
            className="p-3 text-black rounded-lg border border-gray-300 w-1/2"
          />
        </div>

        <div className="flex justify-between mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useRandomExpiry}
              onChange={() => setUseRandomExpiry(!useRandomExpiry)}
              className="h-5 w-5"
            />
            Use Random Expiry Date
          </label>
          <button
            onClick={handleGenerate}
            className="p-3 bg-blue-600 text-white rounded-lg w-1/3 hover:bg-blue-700 transition"
          >
            Generate Cards
          </button>
        </div>
      </div>

      {/* Generated Cards */}
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

      {/* Export Buttons */}
      <div className="mb-8">
        <button
          onClick={handleExport}
          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Export to JSON
        </button>
        <button
          onClick={handleCopyAll}
          className="ml-4 p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          <FaClipboard /> Copy All
        </button>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl flex items-center gap-2"><FaQuestionCircle /> FAQ</h2>
        <ul className="list-inside list-disc mt-4">
          <li><strong>Can I use these generated cards for real transactions?</strong> No, these cards are purely for testing purposes.</li>
          <li><strong>What is the Luhn algorithm?</strong> It's a checksum used to validate various identification numbers, including credit card numbers.</li>
          <li><strong>Can I export the data?</strong> Yes, you can export the generated cards in JSON, CSV, or PIEP formats.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
