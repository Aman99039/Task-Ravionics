import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const [customerName, setCustomerName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("orderAmount", orderAmount);
    formData.append("invoice", invoice);

    await API.post("/orders", formData);
    navigate("/");
  };

  return (
    <div className="container">
      <h3>Create Order</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Customer Name</label>
          <input
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Order Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Upload Invoice (PDF)</label>
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setInvoice(e.target.files[0])}
            required
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}
