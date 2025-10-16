import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router";
import { getOrder } from "../utils/api_orders";
import "../styles/invoice.css";
import { Button, Container } from "@mui/material";

const InvoicePage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!order) return <p>No order found</p>;

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h1 className="invoice-title">Nasi Lemak & Western</h1>
        <p className="invoice-address">
          123 Jalan Makan, Kuala Lumpur <br />
          support@nasiwester.my | +60 12-345 6789
        </p>

        <div className="invoice-info">
          <div>
            <p>
              <strong>Customer:</strong> {order.customerName}
            </p>
            <p>
              <strong>Email:</strong> {order.customerEmail}
            </p>
          </div>
          <div>
            <p>
              <strong>Invoice ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.paid_at).toLocaleString()}
            </p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>RM {item.price.toFixed(2)}</td>
                <td>RM {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <p>
            <strong>Total Amount:</strong> RM {order.totalPrice.toFixed(2)}
          </p>
        </div>

        <div className="invoice-footer">
          <p>Thank you for dining with us 🍴</p>
          <p>“Selera Tradisi, Rasa Moden”</p>
        </div>

        
      </div>
      <button className="back-home-btn" onClick={() => navigate("/orders")}>
          ⬅ Back
        </button>
    </div>
  );
};

export default InvoicePage;
