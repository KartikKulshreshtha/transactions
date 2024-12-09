import React, { useState } from "react";

const AddTrasaction = ({onSubmit}) => {
  const [transactionType, setTransactionType] = useState(null);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const payload = {
        type: transactionType,
        amount,
        description,
      };
    onSubmit(payload);
  }
  return (
    <div className="mb-16">
      <h1 className="font-bold text-lg">New Transaction</h1>
      <form>
        <div className="flex gap-40 my-12">
          <label htmlFor="transactionType">Transaction Type: </label>
          <select
            className="w-96 mt-2"
            id="transactionType"
            name="transactionType"
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="debit">Debit</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div className="flex gap-40 my-12">
          <label htmlFor="transactionType">Amount: </label>
          <input
            type="number"
            className="w-96 mt-2"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-40 my-12">
          <label htmlFor="transactionType">Description: </label>
          <input
            type="text"
            className="w-96 mt-2"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          onClick={(e) => handleOnSubmit(e)}
          className="bg-blue-600 p-2 rounded-md text-white mb-5 w-20"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddTrasaction;
