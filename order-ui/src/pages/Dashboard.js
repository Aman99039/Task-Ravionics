import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container">
      <h3>All Orders</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>
                <Link to={`/orders/${o._id}`}>{o._id.slice(-6)}</Link>
              </td>
              <td>{o.customerName}</td>
              <td>₹{o.orderAmount}</td>
              <td>{new Date(o.orderDate).toLocaleString()}</td>
              <td>
                <a href={o.invoiceFileUrl} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
