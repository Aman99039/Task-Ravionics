import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container">
      <h3>Order Details</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <strong>Customer:</strong> {order.customerName}
        </li>
        <li className="list-group-item">
          <strong>Amount:</strong> ₹{order.orderAmount}
        </li>
        <li className="list-group-item">
          <strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}
        </li>
        <li className="list-group-item">
          <strong>Invoice:</strong>
          <a
            href={order.invoiceFileUrl}
            target="_blank"
            rel="noreferrer"
            className="ms-2"
          >
            Download PDF
          </a>
        </li>
      </ul>
    </div>
  );
}
