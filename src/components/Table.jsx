import React, { useEffect, useState } from "react";
import AddTrasaction from "./AddTrasaction";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  let fetchTranactions = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/transactions/getAllTrasaction"
    );
    if (response.data.data) {
      console.log(response.data.data);
      setData(response.data.data);
    }
  };
  useEffect(() => {
    fetchTranactions();
  }, []);
  const handleSubmit = async (payload) => {
    const response = await axios.post(
      "http://localhost:8000/api/transactions/addTransaction",
      payload
    );
    if (response.data.status === 200) {
      alert("Transactions added successfully");
    }
    setShowTransaction(false);
    fetchTranactions()
  };
  return (
    <div>
      <div class="relative overflow-x-auto">
        {showTransaction && <AddTrasaction onSubmit={handleSubmit} />}
        <button
          className="bg-blue-600 p-3 rounded-md text-white mb-5"
          onClick={(e) => setShowTransaction(!showTransaction)}
        >
          Add Transaction
        </button>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-slate-700 dark:bg-gray-700 dark:text-gray-400 rounded-md">
            <tr>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Credit
              </th>
              <th scope="col" class="px-6 py-3">
                Debit
              </th>
              <th scope="col" class="px-6 py-3">
                Running Balance
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {data &&
              data.length > 0 &&
              data.slice(0).reverse().map((item) => {
                return (
                  <tr key={item.id}>
                    <td class="px-6 py-4 whitespace-nowrap">{item.date.slice(0, 10)}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {item.description}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{item.type === "credit" ? item.amount : "-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{item.type === "debit" ? item.amount : "-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {item.remaining}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
